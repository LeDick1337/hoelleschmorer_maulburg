import os

def dateien_umbenennen(ordner_pfad):
    """
    Benennt alle Dateien in einem Ordner um zu galerie_1, galerie_2, etc.
    """
    # Prüfen ob der Ordner existiert
    if not os.path.exists(ordner_pfad):
        print(f"Fehler: Ordner '{ordner_pfad}' existiert nicht!")
        return
    
    # Alle Dateien im Ordner auflisten
    dateien = [f for f in os.listdir(ordner_pfad) if os.path.isfile(os.path.join(ordner_pfad, f))]
    
    if not dateien:
        print("Keine Dateien im Ordner gefunden!")
        return
    
    print(f"\n{len(dateien)} Datei(en) gefunden.")
    print("\nVorschau der Umbenennungen:")
    print("-" * 50)
    
    # Vorschau anzeigen
    for i, datei in enumerate(dateien, 1):
        _, endung = os.path.splitext(datei)
        neuer_name = f"galerie_{i}{endung}"
        print(f"{datei} -> {neuer_name}")
    
    # Bestätigung einholen
    print("-" * 50)
    antwort = input("\nMöchten Sie fortfahren? (j/n): ").lower()
    
    if antwort != 'j':
        print("Abgebrochen.")
        return
    
    # Dateien umbenennen
    for i, datei in enumerate(dateien, 1):
        alter_pfad = os.path.join(ordner_pfad, datei)
        _, endung = os.path.splitext(datei)
        neuer_name = f"galerie_{i}{endung}"
        neuer_pfad = os.path.join(ordner_pfad, neuer_name)
        
        try:
            os.rename(alter_pfad, neuer_pfad)
            print(f"✓ Umbenannt: {datei} -> {neuer_name}")
        except Exception as e:
            print(f"✗ Fehler bei {datei}: {e}")
    
    print("\nFertig!")

# Hauptprogramm
if __name__ == "__main__":
    print("=== Datei-Umbenenner ===\n")
    ordner = input("Geben Sie den Pfad zum Ordner ein: ").strip()
    dateien_umbenennen(ordner)