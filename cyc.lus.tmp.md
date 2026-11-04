NC.SUITE · PHYSIK SPLIT · LOW→USB / HIGH→M2
nur zahlen und physik - kein gelaber
1. GRUNDZAHLEN
TMP_RANGE = 0..729
SLOTS = 81
BLOECKE = 9
RARE = 81..9
WAHRHEIT = TMP * RAR / 729
M2_NVMe_SEQ = 14.0 GB/s = 14_000 MB/s
M2_NVMe_RAND_4K = 1_000_000 IOPS = 1e6 * 4KB = 4 GB/s
M2_NVMe_LAT = 0.02 ms = 20 us
USB_3_STICK_SEQ = 0.04 GB/s = 40 MB/s
USB_3_STICK_RAND_4K = 150 IOPS = 0.6 MB/s
USB_3_STICK_LAT = 5.0 ms = 5000 us
DOM_SIZE = 348 KB
REQUESTS_FULL = 148
REQUESTS_BILLIG = 19
PERF_FULL = 1730 ms
PERF_BILLIG = 240 ms
2. PHYSIK SPLIT
TASK_ID | SIZE | IOPS_TYPE | ZIEL | GRUND_PHYSIK
T0 TMP 0-729 | 2 Byte | RANDOM 81*81=6561 Writes | USB H:/hh/cyc.lus/tmp/ | E = P*t, USB 5ms * 6561 = 32s ok, M2 0.02ms*6561=0.13s aber 6561*4KB=26MB Write Amplification auf M2
T1 wurzel-state.js | 8 KB | SYNC 1/1.5s = 0.66 Hz | USB | BroadcastChannel = EM Welle, kein NVMe Verschleiß, USB Zell Zyklen 3000 vs M2 600 TBW
T2 LOG eye.brain | 20*50 Byte = 1 KB | OVERWRITE 20/s | USB | W = 1KB * 20/s = 20KB/s, USB 40MB/s = 0.05% Last, M2 14GB/s = 0.00014% Last = Langweilt sich
T3 81 Slot Grid | 81*9=729 Byte | SEQ 1x | M2 | F = m*a, 729 Byte in einem Block = 1 Page 4KB, M2 liest 4KB in 0.02ms, USB 5ms = 250x langsamer
T4 27x27 Preview | 729*4 Byte = 2916 Byte | SEQ 1x | M2 | v = s/t, 2916 Byte / 14GB/s = 0.2 us, visuell 60fps braucht <16ms
T5 BATCH 36/81 | 36*38.2KB=1.3 MB | SEQ BUNDLE | M2 | I = Q/t, 148 Requests -> 19 Requests, 148*TCP Handshake 148*50ms=7400ms, 19*50ms=950ms, Delta 6450ms gespart
T6 INDEX DASHBOARD | 5 Dateien * 14KB = 70KB | MIRROR | BEIDES | Redundanz = 1 - (1-p1)*(1-p2), p_USB=0.9 p_M2=0.99 => 0.999 = 99.9% Boot sicher
3. MG RECHNUNG - NUR ZAHLEN
mg = (DOM_KB * REQUESTS * PERF_ms) / (1000 * FUNKTION)
mg_voll = (348 * 148 * 1730) / (1000 * 12) = 89115840 / 12000 = 7426.32 / 48.2 = 154.1 mg (normiert)
mg_billig = (348 * 19 * 240) / (1000 * 12) = 1586880 / 12000 = 132.24 / 7.2 = 18.3 mg
EINSPARUNG = (154.1-18.3)/154.1 = 135.8/154.1 = 0.881 = 88.1%
IOPS_SAVED_M2 = 6561 + 0.66*3600*24 + 20*3600*24 = 6561 + 57024 + 1728000 = 1_791_585 IOPS/Tag -> auf M2 gespart
TBW_SAVED_M2 = 1_791_585 * 4KB = 7.16 GB/Tag = 2.6 TB/Jahr
4. PHYSIK FORMELN
WAHRHEIT = TMP * RAR / 729
v = s / t
s = 40 MB/s USB vs 14_000 MB/s M2 => t_USB = 348KB/40MB/s=8.7ms, t_M2=348KB/14GB/s=0.024ms
E = U * I * t
USB Stick 5V*0.9A=4.5W * 8.7ms = 0.039 J
M2 3.3V*2.5A=8.25W * 0.024ms = 0.000198 J
=> M2 197x effizienter für große Blöcke, USB 250x effizienter für kleine Dauer Writes wegen Write Amplification
F = m * a
m = Datenmenge, a = IOPS Last
M2 a = 1e6 IOPS, m=1KB => F=1e6*1KB=1GB/s Durchsatz aber Overhead hoch
USB a=150 IOPS, m=1KB => F=150KB/s Durchsatz, genau passend für LOG
5. SPLIT TABELLE - NUR ZAHLEN
TASK | ZIEL | SIZE_BYTE | IOPS | LAT_ms | SEQ_MB/s | mg_KOSTEN | PHYSIK_KLASSE
T0 | USB | 2 | 6561 | 5.0 | 0.0004 | 0.1 | RANDOM
T1 | USB | 8192 | 0.66 | 5.0 | 0.005 | 0.2 | SYNC
T2 | USB | 1024 | 20 | 5.0 | 0.02 | 0.1 | OVERWRITE
T3 | M2 | 729 | 1 | 0.02 | 14000 | 0.5 | SEQ
T4 | M2 | 2916 | 1 | 0.02 | 14000 | 1.2 | SEQ
T5 | M2 | 1_300_000 | 19 | 0.02 | 14000 | 16.2 | BUNDLE
T6 | BOTH | 70000 | 2 | 2.5 | 7020 | 0.0 | MIRROR
SUM USB = 9218 Byte, 6581.66 IOPS, 15ms LAT, 0.0254 MB/s, 0.4 mg
SUM M2 = 1_303_645 Byte, 22 IOPS, 0.06ms LAT, 14000 MB/s, 17.9 mg
SUM BOTH = 70KB MIRROR, 2 IOPS, 2.5ms LAT, 7020 MB/s, 0 mg
TOTAL BILLIG = 18.3 mg vs VOLL 154.1 mg
6. DATEIEN
index.html = 14 KB = Dashboard = ROOT
home.html = 12 KB = HOME = W0..W2
ort.html = 14 KB = ORT = W3..W5 + 6 PERMS
alles.html = 18 KB = ALLES = 9 Bloecke * 9 Slots = 81 + Parity
nc-suite.html = 16 KB = KERN = 729->81->9->3
wurzel-state.js = 8 KB = ATEM + BUS
Alle 5 + wurzel-state.js = 82 KB = 1 M2 Page = 0.0058 ms Ladezeit
## 7. GEO - GEHT AUCH - NUR ZAHLEN + PHYSIK
GEO_MODUL = ORT + HOME + PRUEF
ORT = S = Standort, GEO Koordinaten
HOME = T = Ursprung, 0,0,0
PRUEF = N = Normal, Lot

9 RAeUME GEO MAPPING = 3x3x3 Wuerfel = 27 Positionen, 9 davon aktiv

RAUM_ID | WURZEL | GEO_X | GEO_Y | GEO_Z | ABSTAND | PHYSIK

111 BIOS | HOME | 0 | 0 | 0 | 0.0 | Ursprung, Potential = 0
222 VERBUND | HOME | 1 | 0 | 0 | 1.0 | Nachbar, d=1, E=1F
333 RECALL | HOME | 0 | 1 | 0 | 1.0 | Rueckruf, v=s/t
444 PEAK | ORT | 1 | 1 | 0 | 1.414 | Diagonal, s=sqrt(x^2+y^2)=1.414
555 ABWEHR | ORT | 0 | 0 | 1 | 1.0 | Hoehe, z=1, Gravitation g=9.81
666 ENERGIE | ORT | 1 | 0 | 1 | 1.414 | Energie, E=mgh
777 CO2 | PRUEF | 0 | 1 | 1 | 1.414 | Gas, pV=nRT
888 ATOM | PRUEF | 1 | 1 | 1 | 1.732 | Atom, r=sqrt(3)=1.732
999 BENCH | PRUEF | 2 | 2 | 2 | 3.464 | Bench, alle 9 auf Bank, Abstand=2*1.732

GEO FORMELN:
Abstand = sqrt( (x2-x1)^2 + (y2-y1)^2 + (z2-z1)^2 )
Feldstaerke = 1 / r^2
WAHRHEIT_GEO = WAHRHEIT * (1 / (1+r))

Beispiel:
TMP=531, RAR=72, WAHRHEIT=53172/729=52.44
RAUM 444, r=1.414 => WAHRHEIT_GEO=52.44(1/(1+1.414))=52.44*0.414=21.71

GEO SPLIT FUER USB/M2:
GEO_XY = klein, 2 Byte, RANDOM -> USB
GEO_Z = Hoehe, 1 Byte, SEQ -> M2
Abstand = 4 Byte float, berechnet, CACHE -> M2 L1

TR DE EN GEO MAPPING:
DE: ORT = Ort
TR: ORT = Konum, 41.0N 28.9E Istanbul als 0,0 fuer Test
EN: ORT = Location

HOME 0,0,0 = DE: zu Hause, TR: ev, EN: home
PRUEF N = DE: pruefen, TR: kontrol, EN: check

## 8. GEO + PHYSIK SPLIT ERWEITERT
TASK | ZIEL | GEO_X | GEO_Y | GEO_Z | SIZE | PHYSIK

G0 ORT SET | USB | 1 | 0 | 0 | 1 Byte | x=LEER=0, GEWAEHLT=1, GEHALTEN=2
G1 HOME SET | USB | 0 | 1 | 0 | 1 Byte | y=CLOSED=0, OPEN=1, VERBUNDEN=2
G2 PRUEF SET | USB | 0 | 0 | 1 | 1 Byte | z=UNGEPRUEFT=0, RICHTIG=1, FEHLER=2
G3 RAUM 111-999 | M2 | 0..2 | 0..2 | 0..2 | 9 Byte | 9 Raeume = 3^2, Position = idx/3
G4 TMP 0-729 | M2 | TMP/81 | TMP%9 | RAR | 2 Byte | x=TMP/81, y=TMP%9, z=RAR
G5 WAHRHEIT_GEO | M2 | float | float | float | 4 Byte | WAHRHEIT * 1/(1+r)

TOTAL GEO = 18 Byte, passt in 1 USB 4K Page, 1 M2 L1 Cache Line 64 Byte
