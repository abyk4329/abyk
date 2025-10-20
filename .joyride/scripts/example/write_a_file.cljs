(ns example.write-a-file
  (:require [clojure.string :as str]
            ["fs" :as fs]
            ["path" :as path]
            ["vscode" :as vscode]))

(defn info [& xs]
  (vscode/window.showInformationMessage (str/join " " xs)))

(def root-path (-> (first vscode/workspace.workspaceFolders) .-uri .-fsPath))

(info "The root path of this workspace:" root-path)

(fs/writeFileSync (path/resolve root-path "test-from-cljs-script.txt")
                  "Written from a Workspace ClojureScript Script!")
