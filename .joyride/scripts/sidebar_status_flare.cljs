(ns sidebar-status-flare
  "Sidebar flare with quick project context for Awakening."
  (:require [joyride.core :as joyride]
            [joyride.flare :as flare]))

(defn render-sidebar! []
  (flare/flare!+
   {:title "פאנל פעולה מהירה"
    :key :sidebar-1
    :reveal? true
    :html
    [:div {:dir "rtl"
           :style {:font-family "Assistant, sans-serif"
                   :padding "18px"
                   :color "#3a2a1d"}}
     [:style
      "h2 { font-size: 1.25rem; margin-bottom: 0.5rem; }
       p { margin: 0 0 1rem; line-height: 1.6; }
       ul { margin: 0; padding-inline-start: 1.25rem; }
       li { margin-block: 0.35rem; }
       .tag { display: inline-flex; align-items: center; gap: 6px; background: #f0e9df; color: #5e4934; border-radius: 999px; padding: 4px 10px; font-size: 0.85rem; }
       .section { margin-block-end: 18px; }
       .muted { color: #75614c; font-size: 0.9rem; }"]
     [:div {:class "section"}
      [:span {:class "tag"} "ABYK"]
      [:h2 "ניהול שינויים"]
      [:p "קבלי תמונת מצב על שינויים, הריצי בדיקות וסיימי קומיט בעברית קצרה וברורה."]]
     [:div {:class "section"}
      [:strong "פקודות שימושיות:"]
      [:ul
       [:li "cmd+option+j p – בחרי פקודת pnpm דרך Joyride"]
       [:li "cmd+option+j g – פתחי מסך השינויים החדשים"]
       [:li "pnpm lint && pnpm build – וידוא שהכל ירוק"]]]
     [:div {:class "section"}
      [:strong "תזכורת נגישות:"]
      [:ul
       [:li "לא להסיר פוקוס נראה ממרכיבים אינטראקטיביים"]
       [:li "להקפיד על כיווניות RTL וטקסטים בעברית"]
       [:li "בדקי צבעים מול הטוקנים הקיימים"]]]
     [:p {:class "muted"}
      "מעדכנת? אל תשכחי לעדכן את docs/ כשהארכיטקטורה משתנה."]]}))

  (render-sidebar!)
