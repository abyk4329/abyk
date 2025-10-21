(ns flare-script
  (:require [joyride.core :as joyride]
            [joyride.flare :as flare]
            ["vscode" :as vscode]))

(def panel-config
  {:file "assets/flare-dev/dev-tools.html"
   :title "🔥 Flare Dev Tools"
   :key :sidebar-1
   :reveal? true
   :preserve-focus? false
   :webview-options {:enableScripts true
                     :retainContextWhenHidden true
                     :enableCommandUris true
                     :localResourceRoots []}})

(defn send-to-panel! [message]
  "Send message to Flare webview panel"
  (js/console.log "[Flare] Message:" (js/JSON.stringify message)))

(defn show-panel! []
  (flare/flare!+ panel-config)
  (send-to-panel! {:command "ready" :text "Flare Dev Tools ready!"}))

(when (= (joyride/invoked-script) "scripts/flare.cljs")
  (show-panel!))