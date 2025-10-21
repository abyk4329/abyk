(ns pnpm-tasks
  "Runner for pnpm scripts via Joyride command palette."
  (:require [joyride.core :as joyride]
            ["vscode" :as vscode]))

(def commands
  {"dev" "pnpm dev"
   "dev:v2" "pnpm dev:v2"
   "build" "pnpm build"
   "build:analyze" "pnpm build:analyze"
   "start" "pnpm start"
   "lint" "pnpm lint"
   "lint:fix" "pnpm lint:fix"
   "typecheck" "pnpm typecheck"
   "test:e2e" "pnpm test:e2e"
   "test:e2e:smoke" "pnpm test:e2e:smoke"})

(defn run-terminal-command [command]
  (let [terminals (.-terminals vscode/window)
        existing (some #(when (= (.-name %) "pnpm-tasks") %) terminals)
        terminal (or existing
                      (.createTerminal vscode/window
                                        (clj->js {:name "pnpm-tasks"
                                                 :shellPath "zsh"})))]
    (.show terminal true)
    (.sendText terminal command true)))

(defn pick-command []
  (let [quickPick (.createQuickPick vscode/window)]
    (set! (.-title quickPick) "בחרי פקודת pnpm להרצה")
    (set! (.-items quickPick)
          (clj->js (map (fn [[label command]]
                          {:label label :description command})
                        commands)))
    (js/Promise.
     (fn [resolve _reject]
       (set! (.-onDidAccept quickPick)
             (fn []
               (let [selection (.-selectedItems quickPick)
                     item (aget selection 0)
                     label (when item (.-label item))
                     command (and label (get commands label))]
                 (.hide quickPick)
                 (resolve command))))
       (set! (.-onDidHide quickPick)
             (fn []
               (resolve nil)))
       (.show quickPick)))))

(defn run []
  (-> (pick-command)
      (.then (fn [command]
               (when command
                 (run-terminal-command command))))))

(when (= (joyride/invoked-script) "scripts/pnpm_tasks.cljs")
  (run))
