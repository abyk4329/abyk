(ns live-preview-flare
  "Live website preview inside a Joyride flare."
  (:require [clojure.string :as str]
            [joyride.core :as joyride]
            [joyride.flare :as flare]
            ["vscode" :as vscode]))

(def default-url "http://localhost:3000")
(defonce state (atom {:url default-url}))

(defn open-preview! [url]
  (let [final-url (if (str/blank? url) default-url url)]
    (reset! state {:url final-url})
    (flare/flare!+
     {:title "תצוגה חיה"
      :key :live-preview
      :reveal? true
      :preserve-focus? false
      :webview-options {:retainContextWhenHidden true
                        :enableScripts true}
      :url final-url})))

(defn run []
  (-> (.showInputBox
       vscode/window
       (clj->js {:title "תצוגת אתר חיה"
                 :prompt "הקלידי כתובת לתצוגה (למשל http://localhost:3000). השאירי ריק כדי להשתמש בערך ברירת המחדל."
                 :value (:url @state)
                 :ignoreFocusOut true
                 :placeHolder default-url}))
      (.then (fn [value]
               (cond
                 (some? value) (open-preview! value)
                 (:url @state) (open-preview! (:url @state))
                 :else (open-preview! default-url))))))

(when (= (joyride/invoked-script) "scripts/live_preview_flare.cljs")
  (run))
