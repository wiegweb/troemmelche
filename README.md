# Trömmelche

Welche Session war dat noch ens?

Mobiles Musikspiel für 1–6 Teams. Statische Website: die vollständige Anwendung liegt in `index.html`. Kein Build und keine Server-Datenbank nötig. Musik benötigt Internet und externe Anbieter.

## Spielvarianten

| Modus | Vorgegeben | Zu erraten | Sieg |
| --- | --- | --- | --- |
| Klassisch | nichts | Interpret, Titel und zeitliche Einordnung | Karten |
| Titel raten | Interpret | Titel und zeitliche Einordnung | Karten |
| Interpret raten | Titel | Interpret und zeitliche Einordnung | Karten |
| Mix | wechselt aus den drei Varianten | abhängig von der Runde | Karten |
| Nur das Jahr | Interpret und Titel | zeitliche Einordnung | Karten |
| Songduell | nichts | Interpret und Titel | Bonuspunkte |

Antworten zuerst laut nennen, dann aufdecken und gemeinsam bestätigen. Pro vorher verdecktem, richtig erratenem Bestandteil gibt es 1 Bonuspunkt und 1 Kamelle. Doppelklicks zählen nicht doppelt. Die Wertung bleibt bis zum nächsten Zug korrigierbar. Auch bei falscher zeitlicher Einordnung gibt es Bonuspunkte für richtige Angaben.

1 Kamelle überspringt einen Song; 3 Kamelle kaufen eine Karte (nur Zeitstrahl-Modi). Gesammelte Bonuspunkte bleiben beim Ausgeben erhalten. Im Songduell gewinnt das Team, das das gewählte Punkteziel erreicht. Beim leeren Stapel entscheidet die höchste relevante Wertung; Gleichstände sind möglich.

## Songauswahl

Aufklappbare Liste mit Checkboxen und Formular für eigene Songs, einschließlich optionalem YouTube- oder Spotify-Link. Gespeichert wird im Browser. Die ursprüngliche Songliste und Einstellungen werden auf derselben Origin einmalig aus der alten Mathespiel-Fassung übernommen; danach verwendet Trömmelche einen eigenen Speicherbereich. Anmeldungstokens werden nicht übernommen.

Für den Zeitstrahl zählt das eingetragene Erscheinungsjahr, nicht zwingend die Session des größten Erfolgs. Die übernommenen Jahreszahlen wurden nicht vollständig neu recherchiert.

## Spendenleiste

Die ursprüngliche Formulierung steht dezent am Ende der Start- und Ergebnisseite. Für einen aktiven Link `DONATE_URL` in `index.html` setzen. Solange der Wert leer ist, informiert der Button darüber, dass noch kein Spendenlink hinterlegt ist.

## Eigenes GitHub-Repository

Repository: https://github.com/wiegweb/troemmelche

Die Veröffentlichung über GitHub Pages muss in den Repository-Einstellungen aktiviert sein.

1. In Settings → Pages die Veröffentlichung aus dem Branch `main`, Ordner `/ (root)`, aktivieren.
2. Die von GitHub angezeigte Pages-Adresse verwenden.

Spotify benötigt gegebenenfalls die neue Pages-Adresse als zusätzliche Redirect URI. Ohne Spotify verwendet die Anwendung YouTube und anschließend Apple-Ausschnitte. Autoplay, Premium-Anmeldung und Verfügbarkeit externer Medien hängen von den Anbietern und dem Browser ab.

## Prüfungen

`node tests/game.test.cjs`

Prüft alle Modi, getrennte Bonuswertung, Korrekturen, mehrfaches Klicken, Ausschluss vorgegebener Angaben, Wertung vor Teamwechsel, Bonus bei falschem Jahr, Punkteziel, Kamelle-Ausgaben, Mix-Rotation und Spielstart mit ausgewählten Songs.

Zusätzlich im Browser geprüft: vorgegebener Interpret, Bonus vergeben und zurücknehmen, Songduell bis zum Sieg, Spendenleiste und mobile Darstellung.
