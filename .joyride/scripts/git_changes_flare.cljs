(ns git-changes-flare
  "Interactive Joyride flare for reviewing Git changes in the ABYK workspace."
  (:require [clojure.string :as str]
            [joyride.core :as joyride]
            [joyride.flare :as flare]
            [promesa.core :as p]
            ["vscode" :as vscode]))

(defonce child-process (js/require "child_process"))

(def flare-key :abyk-code-changes)

(def max-diff-chars 15000)

(defn workspace-path []
  (some->> (.-workspaceFolders (.-workspace vscode))
           (aget 0)
           (.-uri)
           (.-fsPath)))

(defn truncate [text limit]
  (let [value (or text "")]
    (if (> (count value) limit)
      (str (subs value 0 limit)
           "\n--- נחתך לתצוגה. פתחי diff מלא ב-Git אם נדרש. ---\n")
      value)))

(defn parse-status [status-output]
  (->> (str/split-lines (or status-output ""))
       (map str/trim)
       (remove str/blank?)
       (map (fn [line]
              (if-let [[_ code path] (re-matches #"^(.{1,2})\s+(.*)$" line)]
                {:code (str/trim code)
                 :path (str/trim path)}
                {:code "?"
                 :path line})))
       (into [])))

(defn run-git
  [cwd args]
  (p/create
   (fn [resolve _reject]
     (.execFile child-process
                "git"
                (clj->js args)
                (clj->js {:cwd cwd
                          :maxBuffer (* 1024 1024)})
                (fn [err stdout stderr]
                  (let [out (str stdout)
                        err-text (str stderr)]
                    (if err
                      (resolve (str "✖ " (.message err) (when (not (str/blank? err-text)) (str "\n" err-text))))
                      (resolve (if (str/blank? out) err-text out)))))))))

(defn collect-changes []
  (if-let [cwd (workspace-path)]
    (p/let [status-short (run-git cwd ["status" "--short"])
            staged-summary (run-git cwd ["diff" "--cached" "--stat"])
            working-summary (run-git cwd ["diff" "--stat"])
            diff-all (run-git cwd ["diff" "HEAD"])
            last-commit (run-git cwd ["log" "-1" "--pretty=format:%h %ad %s" "--date=relative"])]
      {:status-raw (or status-short "אין שינויים")
       :files (parse-status status-short)
       :staged-summary (if (str/blank? staged-summary) "אין קבצים בסטייג׳" staged-summary)
       :working-summary (if (str/blank? working-summary) "אין קבצים בעבודה פעילה" working-summary)
       :diff (truncate diff-all max-diff-chars)
       :last-commit (if (str/blank? last-commit) "אין Commits זמינים" last-commit)
       :generated-at (.toISOString (js/Date.))})
    (p/resolved
     {:error "לא נמצאה תיקיית עבודה פעילה"
      :status-raw "אין נתונים"
      :files []
      :staged-summary ""
      :working-summary ""
      :diff ""})))

(defn safe-path? [path]
  (boolean (re-matches #"[\w\d\-_.\/\\ ]+" path)))

(defn send-update! [payload]
  (flare/post-message!+
   flare-key
   (clj->js (assoc payload :type "update"))))

(defn send-file-diff! [path diff-output]
  (flare/post-message!+
   flare-key
   (clj->js {:type "file-diff"
             :path path
             :diff (truncate diff-output max-diff-chars)})))

(defn handle-message! [message]
  (let [msg-type (.-type message)
        data (.-data message)]
    (case msg-type
      "refresh"
      (p/let [changes (collect-changes)]
        (send-update! changes))

      "select-file"
      (let [path (some-> data (.-path))
            cwd (workspace-path)]
        (if (and path (safe-path? path) cwd)
          (p/let [file-diff (run-git cwd ["diff" "HEAD" "--" path])]
            (send-file-diff! path file-diff))
          (send-file-diff! "" "לא ניתן להציג Diff עבור נתיב זה.")))

      (js/console.warn "Unhandled message from flare:" msg-type data))))

(defn render-flare! []
  (p/let [changes (collect-changes)
          _ (flare/flare!+
              {:title "מסך השינויים - ABYK"
               :key flare-key
               :reveal? true
               :webview-options {:retainContextWhenHidden true
                                 :enableScripts true}
               :message-handler handle-message!
               :html
               [:div {:dir "rtl"}
                [:style
                 "body { font-family: 'Assistant', sans-serif; background: #f5f5f5; color: #3a2a1d; }
                 .wrapper { padding: 24px; max-width: 1024px; margin: 0 auto; }
                 h1 { font-size: 1.8rem; margin-bottom: 0.25rem; }
                 h2 { font-size: 1.2rem; margin-block: 1.5rem 0.75rem; }
                 p.meta { margin-block: 0.5rem 1.5rem; color: #75614c; }
                 .actions { display: flex; gap: 12px; align-items: center; flex-wrap: wrap; margin-bottom: 16px; }
                 button.refresh { background: linear-gradient(135deg, #b9a695, #a87f58); color: #fff; border: none; border-radius: 999px; padding: 10px 20px; font-size: 0.95rem; cursor: pointer; box-shadow: 4px 4px 12px rgba(0,0,0,0.1); transition: transform 0.2s ease; }
                 button.refresh:hover { transform: scale(1.02); }
                 button.refresh:active { transform: scale(0.98); }
                 span.last-refresh { font-size: 0.85rem; color: #75614c; }
                 section.card { background: #f5f5f5; border-radius: 28px; padding: 20px; box-shadow: 10px 10px 20px rgba(0,0,0,0.08), -10px -10px 20px rgba(255,255,255,0.6); margin-top: 16px; }
                 pre, textarea { background: #fff; border-radius: 18px; padding: 16px; line-height: 1.4; font-size: 0.85rem; direction: ltr; color: #312417; }
                 pre { overflow-x: auto; }
                 textarea { width: 100%; min-height: 200px; resize: vertical; border: 1px solid rgba(168,127,88,0.25); }
                 ul.file-list { list-style: none; padding: 0; margin: 0; display: grid; gap: 8px; }
                 ul.file-list li { background: #fff; border-radius: 999px; padding: 10px 16px; display: flex; justify-content: space-between; align-items: center; gap: 12px; box-shadow: inset 6px 6px 12px rgba(0,0,0,0.05), inset -6px -6px 12px rgba(255,255,255,0.7); }
                 ul.file-list li button { background: transparent; border: none; color: #a87f58; cursor: pointer; font-size: 0.9rem; text-decoration: underline; }
                 .empty { color: #9f8572; text-align: center; }
                 footer { margin-top: 24px; font-size: 0.85rem; color: #75614c; display: flex; flex-direction: column; gap: 6px; }
                 .tips { display: grid; gap: 6px; }
                 .tips strong { color: #a87f58; }
                 .diff-area { margin-top: 16px; }
                 label { font-weight: 600; display: block; margin-bottom: 6px; color: #5e4934; }
                 .status-grid { display: grid; gap: 16px; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); }
                 @media (max-width: 720px) { .wrapper { padding-inline: 16px; } }"]
                [:div {:class "wrapper"}
                 [:header
                  [:h1 "מסך שינויים לפרויקט Awakening"]
                  [:p {:class "meta"} "מקור נתונים: git status & git diff. הכל מעודכן לגרסה הנוכחית של הענף."]]
                 [:div {:class "actions"}
                  [:button {:class "refresh" :id "refresh-btn"} "רענון הנתונים"]
                  [:span {:class "last-refresh" :id "last-refresh"} "טוען..."]
                  [:span {:class "last-refresh" :id "last-commit"} ""]]
                 [:section {:class "card"}
                  [:h2 "סטטוס Git (קבצים ששונו)"]
                  [:div {:id "status-empty"} "טוען..."]
                  [:ul {:class "file-list" :id "files-list"}]]
                 [:section {:class "card"}
                  [:h2 "סיכום שינויים"]
                  [:div {:class "status-grid"}
                   [:div
                    [:label "סטייג׳ נוכחי"]
                    [:pre {:id "staged-summary"} ""]]
                   [:div
                    [:label "שינויים לא משויכים"]
                    [:pre {:id "working-summary"} ""]]]]
                 [:section {:class "card"}
                  [:h2 "Diff מלא מול HEAD"]
                  [:div {:class "diff-area"}
                   [:label "תצוגה מרוכזת"]
                   [:textarea {:id "diff-output" :readOnly true :placeholder "diff רץ..."} ""]]]
                 [:section {:class "card"}
                  [:h2 "Diff לקובץ שנבחר"]
                  [:div {:class "diff-area"}
                   [:label {:id "selected-file-title"} "לא נבחר קובץ"]
                   [:textarea {:id "file-diff-output" :readOnly true :placeholder "בחרי קובץ מהרשימה למעלה"} ""]]]
                 [:footer
                  [:div {:class "tips"}
                   [:strong "צעדים מומלצים לסיום:"]
                   [:span "1. הריצי pnpm lint + pnpm build כדי לוודא שהכל נשאר ירוק."]
                   [:span "2. עברי על המסמכים הנלווים (docs/*) אם הוספת/שינית מבנה ארכיטקטוני."]
                   [:span "3. בצעי commit בעברית (Conventional Commits) כשסיימת לבדוק את השינויים."]]]]
                [:script
                 "const vscode = acquireVsCodeApi();

                  const refreshBtn = document.getElementById('refresh-btn');
                  const filesList = document.getElementById('files-list');
                  const statusEmpty = document.getElementById('status-empty');
                  const stagedSummary = document.getElementById('staged-summary');
                  const workingSummary = document.getElementById('working-summary');
                  const diffOutput = document.getElementById('diff-output');
                  const fileDiffOutput = document.getElementById('file-diff-output');
                  const selectedFileTitle = document.getElementById('selected-file-title');
                  const lastRefresh = document.getElementById('last-refresh');
                  const lastCommit = document.getElementById('last-commit');

                  function toLocalTime(iso) {
                    if (!iso) { return ''; }
                    try {
                      const date = new Date(iso);
                      return date.toLocaleString();
                    } catch (err) {
                      return iso;
                    }
                  }

                  function renderFiles(files) {
                    filesList.innerHTML = '';
                    if (!files || files.length === 0) {
                      statusEmpty.textContent = 'אין קבצים ששונו.';
                      return;
                    }
                    statusEmpty.textContent = '';
                    files.forEach(({ code, path }) => {
                      const item = document.createElement('li');
                      const info = document.createElement('span');
                      info.textContent = `${code.trim()} — ${path}`;
                      const action = document.createElement('button');
                      action.textContent = 'צפי ב-Diff';
                      action.addEventListener('click', () => {
                        vscode.postMessage({ type: 'select-file', data: { path } });
                        selectedFileTitle.textContent = `Diff עבור: ${path}`;
                        fileDiffOutput.value = 'טוען diff...';
                      });
                      item.appendChild(info);
                      item.appendChild(action);
                      filesList.appendChild(item);
                    });
                  }

                  refreshBtn.addEventListener('click', () => {
                    vscode.postMessage({ type: 'refresh' });
                    refreshBtn.disabled = true;
                    refreshBtn.textContent = 'מרענן...';
                    setTimeout(() => {
                      refreshBtn.disabled = false;
                      refreshBtn.textContent = 'רענון הנתונים';
                    }, 1000);
                  });

                  window.addEventListener('message', (event) => {
                    const message = event.data || {};
                    if (message.type === 'update') {
                      if (message.error) {
                        statusEmpty.textContent = message.error;
                        filesList.innerHTML = '';
                        stagedSummary.textContent = '';
                        workingSummary.textContent = '';
                        diffOutput.value = '';
                        fileDiffOutput.value = '';
                        selectedFileTitle.textContent = 'לא נבחר קובץ';
                        lastRefresh.textContent = '';
                        lastCommit.textContent = '';
                        return;
                      }
                      renderFiles(message.files);
                      stagedSummary.textContent = message['staged-summary'] || '';
                      workingSummary.textContent = message['working-summary'] || '';
                      diffOutput.value = message.diff || '';
                      lastRefresh.textContent = `עודכן לאחרונה: ${toLocalTime(message['generated-at'])}`;
                      lastCommit.textContent = `Commit אחרון: ${message['last-commit'] || ''}`;
                      if ((!message.files || message.files.length === 0) && message['status-raw']) {
                        statusEmpty.textContent = message['status-raw'];
                      }
                    }
                    if (message.type === 'file-diff') {
                      fileDiffOutput.value = message.diff || 'לא נמצאו שינויים לקובץ.';
                      if (message.path) {
                        selectedFileTitle.textContent = `Diff עבור: ${message.path}`;
                      }
                    }
                  });

                  vscode.postMessage({ type: 'refresh' });"]]}))
    (send-update! changes)))

(when (= (joyride/invoked-script) "scripts/git_changes_flare.cljs")
  (render-flare!))
