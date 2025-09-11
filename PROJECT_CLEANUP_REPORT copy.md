# Project Cleanup Report (Hebrew Copy – Personalized & Imperative Review)

## Scope

Audit of static numerology corpus `public/numbersmeaninglast.html` and duplicate `abyk/public/numbersmeaninglast.html` prior to normalized plural / infinitive imperative rewrite per revised policy:

Policy (Revised):

1. Keep existing second‑person singular possessive forms ("שלך") – do NOT auto-convert to plural; instead TAG for manual editorial decision.
2. Replace dual‑form gendered imperatives containing a slash (e.g. בחר/י, כתוב/כתבי, צור/צרי, קח/י, עצור/י, קבע/י, הקדש/י, זכור/זכרי, שתף/י, הסבר/י) with either:
   - Plural imperative (preferred): בחרו, כתבו, צרו, קחו, עצרו, קבעו, הקדישו, זכרו, שתפו, הסבירו
   - Or infinitive construction when stylistically smoother (e.g. לבחור, ליצור) – optional future refinement.
3. Leave other personalization tokens (e.g. אתה, לך) unchanged for now (out of scope) unless tied to a slash-form imperative being edited.

## Personalized Strings: Occurrences of "שלך"

Tag format to apply: `שלך<!-- PERSONAL_REVIEW -->`

Occurrences (deduplicated by unique text snippet; appears in BOTH files where noted):

1. "מהלו״ז שלך" – exercise instruction (section: ספרה 1 – דוגמה יומית לתרגול) – both files.
2. "המקום האמיתי שלך: מנהיג" – ספרה 1 – בשורה התחתונה – both.
3. "בקול שלך מתנה" (list item: לראות בקול שלך מתנה לעולם...) – ספרה 2 – מוקדי צמיחה – both (duplicate HTML also repeats inside structured variant).
4. "הקול שלך הוא המתנה שלך" – ספרה 2 – בשורה התחתונה – both (appears twice inside structured + legacy blocks in duplicate file).
5. "נוכחות שלך ולשמחת" – ספרה 3 – מתנות מרכזיות – both.
6. "הערך שלך לא נמדד" – ספרה 3 – דוגמה יומית לתרגול – both.
7. "הכוח האמיתי שלך לא נמצא" – ספרה 7 – בשורה התחתונה – both.
8. Additional repeated duplicates inside the semantically refactored portion of `abyk/public/numbersmeaninglast.html` (structured <section> blocks) for ספרות 1–7 show the same strings again (grep duplication confirmed lines 257+, 302+, 319+, etc.).

Total raw grep matches (capped at 200) included duplicates: 64 (mixed duplication from both files + repeated structured blocks). Unique contextual strings identified for tagging now: 8.

## Dual / Gendered Imperatives (Slash Forms) To Normalize

Pattern groups found (combined both files – duplicates counted):

- בחר/י (task selection) – appears in ספרה 1 (x6 incl. duplicates) + ספרה 4 (physical task) – replace with בחרו
- העבר/י (following בחר/י) – convert to העבירו (paired clause)
- תרגל/י – תרגלו
- כתוב/כתבי – כתבו
- ושתף/י / שתף/י – ושיתפו / שתפו (decide one style; recommendation: שתפו for simplicity)
- אל תנסה/י – אל תנסו (appears within instruction sentence after כתבו; adopt plural negative)
- דבר/י – דברו (same sentence – retain authenticity)
- הקדש/י – הקדישו
- זכור/זכרי – זכרו
- בחר/י (physical tangible task) – בחרו
- קח/י – קחו
- הסבר/י – הסבירו
- צור/צרי – צרו
- עצור/י – עצרו
- קבע/י – קבעו

Counts (approx – after dedupe per semantic occurrence):
| Imperative Slash | Unique Occurrences | With Duplication |
|------------------|--------------------|------------------|
| בחר/י | 2 core (daily exercise + tangible task) | 12+ |
| העבר/י | 1 (paired with daily exercise) | 6 |
| תרגל/י | 1 | 3 |
| כתוב/כתבי | 1 (message writing) | 6 |
| שתף/י | 1 (same sentence as above) | 6 |
| אל תנסה/י | 1 | 2 |
| דבר/י | 1 | 2 |
| הקדש/י | 1 | 4 |
| זכור/זכרי | 1 | 4 |
| קח/י | 1 (knowledge sharing) | 4 |
| הסבר/י | 1 (paired with above) | 4 |
| צור/צרי | 1 | 2 |
| עצור/י | 1 | 3 |
| קבע/י | 1 (pricing offer) | 6 |

## Proposed Replacement Style (Consistent Plural Imperative)

Sentence transforms (legacy → new):

1. היום, בחר/י משימה אחת ... והעבר/י אותה ... תרגל/י ... → היום, בחרו משימה אחת ... והעבירו אותה ... תרגלו ...
2. כתוב/כתבי היום מסר אישי קצר ושתף/י אותו ... אל תנסה/י לייפות – פשוט דבר/י אמת. → כתבו היום מסר אישי קצר ושתפו אותו ... אל תנסו לייפות – פשוט דברו אמת.
3. הקדש/י חצי שעה ... זכור/זכרי: הערך שלך ... → הקדישו חצי שעה ... זכרו: הערך שלך<!-- PERSONAL_REVIEW --> ...
4. בחר/י משימה פיזית מוחשית אחת ... → בחרו משימה פיזית מוחשית אחת ...
5. קח/י נושא ... והסבר/י אותו ... → קחו נושא ... והסבירו אותו ...
6. צור/צרי משהו קטן ... → צרו משהו קטן ...
7. בפעם הבאה שאתה עומד ... עצור/י לרגע, קח/י נשימה, ושאל/י ... → בפעם הבאה שאתה עומד ... עצרו לרגע, קחו נשימה, ושאלו ...
8. כתוב/כתבי הצעה ... קבע/י לו מחיר ברור – ושתף/י אותו החוצה. → כתבו הצעה ... קבעו לו מחיר ברור – ושתפו אותו החוצה.

## Implementation Plan

1. Tag all raw "שלך" instance tokens (exact word boundary) with `<!-- PERSONAL_REVIEW -->` – skip if already tagged.
2. Apply plural imperative replacements above in BOTH files.
3. Post-edit grep validation:
   - Confirm no remaining slash forms: `grep -E 'בחר/י|כת(וב|בי)|הקדש/י|זכור/זכרי|קח/י|הסבר/י|צור/צרי|עצור/י|קבע/י|שתף/י|תרגל/י|העבר/י'`.
   - List any leftover "שלך" without tag: `grep -n 'שלך(?!<\!-- PERSONAL_REVIEW -->)'` (PCRE needed; fallback manual spot check).
4. (Optional) Second pass: evaluate whether to pluralize surrounding pronouns (e.g. אתה → אתם) – deferred pending human editorial choice.

## Risk & Notes

- Duplicated content blocks in `abyk/public/numbersmeaninglast.html` mean double tagging; acceptable (idempotent) but can be cleaned in later structural refactor.
- Tag insertion inside HTML inline text is safe (comments ignored by renderer); spacing preserved.
- Hebrew diacritics / quotes preserved; no structural HTML change.

## Status

All planned transformations completed.

Implemented:

1. Slash imperatives fully removed in both `public/numbersmeaninglast.html` and `abyk/public/numbersmeaninglast.html` (validation: zero matches for original slash patterns).
2. Tagging of every occurrence of the standalone possessive token "שלך" with `<!-- PERSONAL_REVIEW -->` in BOTH files, including duplicated structured blocks in the `abyk` variant. (Post‑validation grep: no untagged instances remain.)
3. Duplicated content blocks retained (no structural dedupe performed) – tagging applied uniformly for audit clarity.

Metrics Summary:

- Unique contextual strings containing "שלך" (prior analysis): 8
- Total raw matches across both files (including duplicates & structured repeats): 64
- Tagged occurrences after completion: 64 / 64 (100%)
- Residual untagged occurrences: 0
- Residual slash imperatives: 0

Notes:

- Some paragraphs and list items appear twice inside the structured `abyk` HTML (legacy + semantic sections). Decision: leave duplication intact for now; future refactor can consolidate once editorial review finishes.
- No pluralization of pronouns (e.g. אתה → אתם) performed – deferred deliberately to keep semantic proximity while only neutralizing slash imperatives.
- HTML comments are inert for rendering; safe for downstream parsing. If a production build strips comments, retain a parallel machine‑readable map if needed in future.

Recommended Next Steps (Deferred):

1. Optional pronoun harmonization (evaluate "אתה" consistency versus plural instructions like "בחרו").
2. Structural deduplication of `abyk/public/numbersmeaninglast.html` to single-source content.
3. Extend audit to other Hebrew static/dynamic content (e.g. React pages) if policy broadens.
4. Introduce CI text lint (regex) to block reintroduction of slash imperatives.

Completion Timestamp: (auto-generated at edit time)

---

Updated automatically (Git assistant audit follow-up).

---

Generated automatically (Git assistant audit).
