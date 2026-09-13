const clone=x=>structuredClone(x);
const pose=(base,changes={})=>Object.assign(clone(base),changes);

const F={head:[180,40],neck:[180,66],hip:[180,145],lShoulder:[154,78],rShoulder:[206,78],lElbow:[143,112],rElbow:[217,112],lWrist:[140,148],rWrist:[220,148],lKnee:[164,202],rKnee:[196,202],lAnkle:[158,264],rAnkle:[202,264]};
const FSQ=pose(F,{head:[180,70],neck:[180,96],hip:[180,169],lShoulder:[151,108],rShoulder:[209,108],lElbow:[132,134],rElbow:[228,134],lWrist:[153,151],rWrist:[207,151],lKnee:[139,207],rKnee:[221,207],lAnkle:[122,264],rAnkle:[238,264]});
const SIDE={head:[207,42],neck:[198,67],hip:[176,146],lShoulder:[194,79],rShoulder:[200,83],lElbow:[190,114],rElbow:[200,116],lWrist:[184,149],rWrist:[198,151],lKnee:[170,204],rKnee:[185,203],lAnkle:[163,264],rAnkle:[194,264]};
const SIT=pose(SIDE,{head:[185,66],neck:[177,90],hip:[165,166],lShoulder:[173,103],rShoulder:[179,107],lElbow:[165,135],rElbow:[177,137],lWrist:[162,166],rWrist:[175,168],lKnee:[211,195],rKnee:[216,204],lAnkle:[213,264],rAnkle:[223,264]});
const SPLIT=pose(F,{lKnee:[132,201],rKnee:[224,201],lAnkle:[105,264],rAnkle:[252,264]});
const SPLITLOW=pose(SPLIT,{head:[180,67],neck:[180,92],hip:[180,170],lShoulder:[154,104],rShoulder:[206,104],lElbow:[144,138],rElbow:[216,138],lWrist:[141,172],rWrist:[219,172],lKnee:[132,214],rKnee:[224,222]});
const LUNGE_SIDE=pose(SIDE,{head:[198,64],neck:[190,88],hip:[168,169],lShoulder:[186,100],rShoulder:[192,104],lElbow:[181,135],rElbow:[192,137],lWrist:[178,169],rWrist:[191,171],lKnee:[210,208],rKnee:[116,221],lAnkle:[244,264],rAnkle:[78,264]});
const SPLIT_SIDE=pose(SIDE,{lKnee:[208,202],rKnee:[126,203],lAnkle:[244,264],rAnkle:[82,264]});
const SUP={head:[70,217],neck:[96,217],hip:[178,220],lShoulder:[108,200],rShoulder:[108,234],lElbow:[126,190],rElbow:[126,244],lWrist:[147,190],rWrist:[147,244],lKnee:[228,188],rKnee:[228,220],lAnkle:[276,232],rAnkle:[276,252]};
const BRIDGE=pose(SUP,{hip:[178,183],lKnee:[228,194],rKnee:[228,216]});
const HIGH={head:[278,123],neck:[250,133],hip:[168,166],lShoulder:[238,148],rShoulder:[241,157],lElbow:[240,190],rElbow:[247,196],lWrist:[241,231],rWrist:[250,231],lKnee:[119,187],rKnee:[120,195],lAnkle:[70,210],rAnkle:[73,219]};
const HIGHLOW=pose(HIGH,{head:[280,160],neck:[251,167],hip:[168,184],lShoulder:[239,179],rShoulder:[242,187],lElbow:[230,211],rElbow:[238,216]});
const FLOOR_HIGH={head:[276,177],neck:[248,187],hip:[168,214],lShoulder:[236,201],rShoulder:[240,209],lElbow:[239,225],rElbow:[246,230],lWrist:[240,258],rWrist:[249,258],lKnee:[119,229],rKnee:[120,237],lAnkle:[70,254],rAnkle:[74,262]};
const FLOOR_LOW=pose(FLOOR_HIGH,{head:[280,220],neck:[250,226],hip:[168,235],lShoulder:[239,233],rShoulder:[243,241],lElbow:[229,252],rElbow:[237,256]});
const KNEE_HIGH=pose(FLOOR_HIGH,{hip:[180,216],lKnee:[132,252],rKnee:[140,258],lAnkle:[104,252],rAnkle:[111,259]});
const KNEE_LOW=pose(FLOOR_LOW,{hip:[180,235],lKnee:[132,252],rKnee:[140,258],lAnkle:[104,252],rAnkle:[111,259]});
const FOREARM_PLANK=pose(FLOOR_HIGH,{lElbow:[226,251],rElbow:[234,257],lWrist:[258,258],rWrist:[266,262],lShoulder:[232,215],rShoulder:[238,222]});
const FOUR={head:[270,168],neck:[244,181],hip:[166,210],lShoulder:[230,194],rShoulder:[233,203],lElbow:[232,224],rElbow:[240,229],lWrist:[233,258],rWrist:[242,260],lKnee:[151,246],rKnee:[174,247],lAnkle:[128,260],rAnkle:[168,262]};
const SIDEPLANKLOW={head:[270,213],neck:[244,220],hip:[170,242],lShoulder:[231,232],rShoulder:[235,239],lElbow:[225,246],rElbow:[231,250],lWrist:[213,262],rWrist:[221,264],lKnee:[121,249],rKnee:[126,255],lAnkle:[75,257],rAnkle:[80,263]};
const SIDEPLANKHIGH=pose(SIDEPLANKLOW,{head:[270,133],neck:[244,148],hip:[170,190],lShoulder:[231,166],rShoulder:[235,173],lElbow:[225,211],rElbow:[231,216],lWrist:[213,258],rWrist:[221,260],lKnee:[121,218],rKnee:[126,226],lAnkle:[75,252],rAnkle:[80,260]});

const scenes={
  "assis-debout-chaise":{a:SIT,b:SIDE,equipment:"chair",traces:["hip"],desc:"Depuis une chaise, le buste s'incline puis le corps se redresse jusqu'à la station debout."},
  "squat-chaise-controle":{a:SIDE,b:pose(SIT,{hip:[174,158],lWrist:[205,132],rWrist:[211,137]}),equipment:"chair",traces:["hip"],desc:"Debout devant une chaise, les hanches reculent jusqu'à frôler l'assise puis remontent."},
  squat:{a:F,b:FSQ,equipment:"none",traces:["hip","lKnee"],desc:"Le bassin descend entre les pieds pendant que les genoux fléchissent, puis remonte."},
  "squat-goblet":{a:pose(F,{lElbow:[160,105],rElbow:[200,105],lWrist:[173,112],rWrist:[187,112]}),b:pose(FSQ,{lElbow:[158,126],rElbow:[202,126],lWrist:[173,132],rWrist:[187,132]}),equipment:"goblet",traces:["hip"],desc:"Une charge tenue contre la poitrine accompagne un squat vertical contrôlé."},
  "fente-arriere-assistee":{a:pose(SIDE,{lWrist:[82,118],lElbow:[122,101]}),b:pose(LUNGE_SIDE,{lWrist:[82,118],lElbow:[124,106]}),equipment:"support-left",traces:["rAnkle","hip"],desc:"Une main reste sur un support pendant qu'un pied recule et que le genou arrière descend vers le sol."},
  "fente-arriere":{a:SIDE,b:LUNGE_SIDE,equipment:"none",traces:["rAnkle","hip"],desc:"Vue de profil, un pied recule depuis la station debout avant une descente verticale en fente."},
  "split-squat":{a:pose(SPLIT_SIDE,{lWrist:[180,151],rWrist:[196,153]}),b:pose(LUNGE_SIDE,{lWrist:[177,173],rWrist:[193,175]}),equipment:"dumbbells",traces:["hip"],desc:"Vue de profil, les pieds restent décalés pendant une descente et une remontée verticales avec haltères."},
  "step-up-bas":{a:pose(SIDE,{lKnee:[164,206],lAnkle:[157,264],rKnee:[214,210],rAnkle:[235,226]}),b:pose(SIDE,{head:[205,25],neck:[196,50],hip:[177,128],lKnee:[184,178],lAnkle:[220,207],rKnee:[171,183],rAnkle:[168,224]}),equipment:"step",traces:["hip","rAnkle"],desc:"Un pied posé sur une marche basse pousse le corps vers le haut jusqu'à monter sur la marche."},
  "pont-fessier":{a:SUP,b:BRIDGE,equipment:"mat",traces:["hip"],desc:"Allongé au sol, pieds posés et genoux pliés, le bassin monte en pont puis redescend."},
  "hip-thrust":{a:pose(SUP,{lShoulder:[112,190],rShoulder:[112,230]}),b:pose(BRIDGE,{lShoulder:[112,190],rShoulder:[112,230]}),equipment:"bench-back",traces:["hip"],desc:"Le haut du dos appuyé sur un banc, le bassin monte jusqu'à l'alignement du tronc et des cuisses."},
  "hip-thrust-charge":{a:pose(SUP,{lShoulder:[112,190],rShoulder:[112,230]}),b:pose(BRIDGE,{lShoulder:[112,190],rShoulder:[112,230]}),equipment:"bench-hip-load",traces:["hip"],desc:"Le haut du dos sur un banc, une charge reste au pli des hanches pendant la montée du bassin."},
  "hip-thrust-unilateral":{a:pose(SUP,{lShoulder:[112,190],rShoulder:[112,230],rKnee:[225,177],rAnkle:[270,162]}),b:pose(BRIDGE,{lShoulder:[112,190],rShoulder:[112,230],rKnee:[226,151],rAnkle:[278,146]}),equipment:"bench-back",traces:["hip"],desc:"Sur un banc, le bassin monte avec un seul pied au sol tandis que l'autre jambe reste levée."},
  "mollets-debout":{a:SIDE,b:pose(SIDE,{head:[207,30],neck:[198,55],hip:[176,134],lShoulder:[194,67],rShoulder:[200,71],lElbow:[190,102],rElbow:[200,104],lWrist:[184,137],rWrist:[198,139],lKnee:[170,192],rKnee:[185,191],lAnkle:[174,260],rAnkle:[203,260]}),equipment:"support-right",traces:["head","lAnkle"],desc:"Debout près d'un appui, les talons se soulèvent pour monter sur l'avant des pieds."},
  "presse-a-cuisses":{a:pose(SIT,{lKnee:[215,186],rKnee:[220,198],lAnkle:[252,145],rAnkle:[259,155]}),b:pose(SIT,{lKnee:[230,166],rKnee:[235,178],lAnkle:[300,125],rAnkle:[305,137]}),equipment:"leg-press",traces:["lAnkle"],desc:"Assis dans une presse, les jambes poussent la plateforme de la position fléchie vers une extension contrôlée."},
  "leg-curl-machine":{a:pose(SIT,{lKnee:[214,197],rKnee:[219,206],lAnkle:[268,213],rAnkle:[273,223]}),b:pose(SIT,{lKnee:[214,197],rKnee:[219,206],lAnkle:[201,245],rAnkle:[208,254]}),equipment:"leg-curl",traces:["lAnkle"],desc:"Assis dans la machine, les talons passent de l'avant vers le dessous du siège en fléchissant les genoux."},
  "pompes-murales":{a:pose(SIDE,{head:[235,68],neck:[220,88],hip:[178,157],lShoulder:[214,101],rShoulder:[220,106],lElbow:[239,112],rElbow:[244,119],lWrist:[284,116],rWrist:[287,124],lKnee:[151,207],rKnee:[159,211],lAnkle:[119,264],rAnkle:[128,264]}),b:pose(SIDE,{head:[270,79],neck:[250,96],hip:[194,163],lShoulder:[242,111],rShoulder:[248,117],lElbow:[259,143],rElbow:[265,149],lWrist:[284,116],rWrist:[287,124],lKnee:[160,212],rKnee:[168,216],lAnkle:[119,264],rAnkle:[128,264]}),equipment:"wall-right",traces:["head"],desc:"Le corps gainé s'approche d'un mur par flexion des coudes puis le repousse."},
  "pompes-inclinees-hautes":{a:pose(HIGH,{lWrist:[278,189],rWrist:[286,193],lElbow:[258,166],rElbow:[264,173]}),b:pose(HIGHLOW,{lWrist:[278,189],rWrist:[286,193],lElbow:[265,202],rElbow:[271,207]}),equipment:"support-high",traces:["head"],desc:"Les mains sur un support haut, le corps descend en bloc vers le bord puis repousse."},
  "pompes-inclinees":{a:pose(HIGH,{lWrist:[278,219],rWrist:[286,223],lElbow:[258,181],rElbow:[264,188]}),b:pose(HIGHLOW,{lWrist:[278,219],rWrist:[286,223],lElbow:[262,220],rElbow:[270,225]}),equipment:"support-low",traces:["head"],desc:"Les mains sur un support bas, le corps descend en bloc avec une inclinaison proche du sol."},
  "pompes-genoux":{a:KNEE_HIGH,b:KNEE_LOW,equipment:"mat",traces:["head"],desc:"Les genoux restent au sol pendant que le buste descend entre les mains puis remonte."},
  pompes:{a:FLOOR_HIGH,b:FLOOR_LOW,equipment:"mat",traces:["head"],desc:"En appui sur les mains et les pointes de pieds, le corps descend en bloc puis repousse le sol."},
  "chest-press-machine":{a:pose(SIT,{lElbow:[142,116],rElbow:[145,136],lWrist:[177,113],rWrist:[180,137]}),b:pose(SIT,{lElbow:[205,116],rElbow:[208,136],lWrist:[250,113],rWrist:[253,137]}),equipment:"chest-press",traces:["lWrist"],desc:"Assis dos au dossier, les deux poignées sont poussées horizontalement devant la poitrine."},
  "developpe-halteres":{a:pose(SUP,{lElbow:[126,170],rElbow:[126,260],lWrist:[158,168],rWrist:[158,262]}),b:pose(SUP,{lElbow:[160,194],rElbow:[160,240],lWrist:[197,194],rWrist:[197,240]}),equipment:"bench-dumbbells",traces:["lWrist","rWrist"],desc:"Allongé sur un banc avec deux haltères, les bras poussent les charges au-dessus de la poitrine."},
  "serrage-omoplates-debout":{a:pose(F,{lElbow:[148,111],rElbow:[212,111],lWrist:[162,123],rWrist:[198,123]}),b:pose(F,{lElbow:[119,103],rElbow:[241,103],lWrist:[147,119],rWrist:[213,119]}),equipment:"scapula",traces:["lElbow","rElbow"],desc:"Debout, les coudes pliés reculent de chaque côté pour rapprocher doucement les omoplates."},
  "tirage-serviette-isometrique":{a:pose(F,{lElbow:[145,105],rElbow:[215,105],lWrist:[125,116],rWrist:[235,116]}),b:pose(F,{lElbow:[126,112],rElbow:[234,112],lWrist:[150,122],rWrist:[210,122]}),equipment:"towel",traces:["lElbow","rElbow"],desc:"Une serviette tendue reste horizontale tandis que les coudes tirent ses extrémités vers le buste."},
  "tirage-elastique":{a:pose(SIDE,{lElbow:[225,105],rElbow:[228,115],lWrist:[265,104],rWrist:[268,114]}),b:pose(SIDE,{lElbow:[190,103],rElbow:[194,113],lWrist:[202,114],rWrist:[206,124]}),equipment:"band-right",traces:["lElbow"],desc:"Face à un élastique ancré, les coudes reculent le long du corps pour tirer les poignées."},
  "rowing-halteres-unilateral":{a:pose(HIGH,{head:[250,112],neck:[225,126],hip:[160,166],lShoulder:[211,142],rShoulder:[218,151],lElbow:[212,184],rElbow:[222,187],lWrist:[210,226],rWrist:[231,204],lKnee:[134,205],rKnee:[166,205],lAnkle:[111,256],rAnkle:[178,255]}),b:pose(HIGH,{head:[250,112],neck:[225,126],hip:[160,166],lShoulder:[211,142],rShoulder:[218,151],lElbow:[212,184],rElbow:[190,165],lWrist:[210,226],rWrist:[207,164],lKnee:[134,205],rKnee:[166,205],lAnkle:[111,256],rAnkle:[178,255]}),equipment:"one-arm-row",traces:["rElbow"],desc:"Buste penché avec une main sur un support, l'autre main tire un haltère vers la hanche."},
  "rowing-machine":{a:pose(SIT,{lElbow:[205,122],rElbow:[209,132],lWrist:[244,121],rWrist:[248,131]}),b:pose(SIT,{lElbow:[157,119],rElbow:[162,130],lWrist:[184,128],rWrist:[188,138]}),equipment:"row-machine",traces:["lElbow"],desc:"Assis face à la machine, les poignées vont des bras tendus jusqu'au buste par recul des coudes."},
  "tirage-vertical":{a:pose(SIT,{lElbow:[138,65],rElbow:[222,65],lWrist:[125,31],rWrist:[235,31]}),b:pose(SIT,{lElbow:[126,119],rElbow:[234,119],lWrist:[149,103],rWrist:[211,103]}),equipment:"pulldown",traces:["lElbow","rElbow"],desc:"Assis sous une poulie haute, une barre large descend du-dessus de la tête vers le haut de la poitrine."},
  "pull-apart-elastique":{a:pose(F,{lElbow:[159,102],rElbow:[201,102],lWrist:[153,105],rWrist:[207,105]}),b:pose(F,{lElbow:[133,98],rElbow:[227,98],lWrist:[104,96],rWrist:[256,96]}),equipment:"band-between",traces:["lWrist","rWrist"],desc:"Un élastique tenu à hauteur de poitrine s'étire lorsque les bras s'écartent sur les côtés."},
  "glisse-murale-scapulaire":{a:pose(F,{lElbow:[145,107],rElbow:[215,107],lWrist:[145,77],rWrist:[215,77]}),b:pose(F,{lElbow:[157,58],rElbow:[203,58],lWrist:[162,25],rWrist:[198,25]}),equipment:"wall-back",traces:["lWrist","rWrist"],desc:"Dos au mur, les avant-bras glissent d'une position en W vers une position haute en Y."},
  "developpe-epaules-halteres":{a:pose(F,{lElbow:[139,97],rElbow:[221,97],lWrist:[141,69],rWrist:[219,69]}),b:pose(F,{lElbow:[157,52],rElbow:[203,52],lWrist:[162,22],rWrist:[198,22]}),equipment:"dumbbells",traces:["lWrist","rWrist"],desc:"Deux haltères partent des épaules et montent verticalement au-dessus de la tête."},
  "elevation-laterale":{a:pose(F,{lWrist:[149,151],rWrist:[211,151]}),b:pose(F,{lElbow:[126,81],rElbow:[234,81],lWrist:[84,82],rWrist:[276,82]}),equipment:"dumbbells",traces:["lWrist","rWrist"],desc:"Deux haltères partent près des cuisses et montent en arc sur les côtés jusqu'à hauteur d'épaules."},
  "face-pull-elastique":{a:pose(SIDE,{lElbow:[226,89],rElbow:[230,99],lWrist:[265,88],rWrist:[269,98]}),b:pose(SIDE,{lElbow:[179,76],rElbow:[184,88],lWrist:[205,74],rWrist:[209,86]}),equipment:"band-face",traces:["lElbow"],desc:"Un élastique ancré à hauteur du visage est tiré vers les tempes avec les coudes ouverts."},
  "dead-bug-talons":{a:pose(SUP,{head:[75,220],neck:[101,220],hip:[180,220],lShoulder:[112,198],rShoulder:[112,238],lElbow:[112,160],rElbow:[112,268],lWrist:[112,126],rWrist:[112,280],lKnee:[215,170],rKnee:[215,226],lAnkle:[258,170],rAnkle:[258,226]}),b:pose(SUP,{head:[75,220],neck:[101,220],hip:[180,220],lShoulder:[112,198],rShoulder:[112,238],lElbow:[112,160],rElbow:[112,268],lWrist:[112,126],rWrist:[112,280],lKnee:[221,181],rKnee:[226,230],lAnkle:[280,205],rAnkle:[279,257]}),equipment:"mat",traces:["lAnkle"],desc:"Allongé, hanches et genoux pliés, un talon s'éloigne jusqu'au sol puis revient."},
  "dead-bug":{a:pose(SUP,{head:[75,220],neck:[101,220],hip:[180,220],lShoulder:[112,198],rShoulder:[112,238],lElbow:[112,160],rElbow:[112,268],lWrist:[112,126],rWrist:[112,280],lKnee:[215,170],rKnee:[215,226],lAnkle:[258,170],rAnkle:[258,226]}),b:pose(SUP,{head:[75,220],neck:[101,220],hip:[180,220],lShoulder:[112,198],rShoulder:[112,238],lElbow:[85,168],rElbow:[112,268],lWrist:[55,155],rWrist:[112,280],lKnee:[215,170],rKnee:[227,232],lAnkle:[258,170],rAnkle:[295,245]}),equipment:"mat",traces:["lWrist","rAnkle"],desc:"Allongé, un bras et la jambe opposée s'éloignent simultanément avant de revenir."},
  "bird-dog":{a:FOUR,b:pose(FOUR,{lElbow:[260,139],lWrist:[305,130],rKnee:[123,181],rAnkle:[68,167]}),equipment:"mat",traces:["lWrist","rAnkle"],desc:"À quatre pattes, un bras et la jambe opposée s'étendent dans l'alignement du tronc."},
  "planche-murale":{a:pose(SIDE,{head:[224,44],neck:[213,68],hip:[183,145],lShoulder:[207,81],rShoulder:[213,86],lElbow:[239,89],rElbow:[244,96],lWrist:[278,89],rWrist:[282,97]}),b:pose(SIDE,{head:[247,63],neck:[232,84],hip:[188,155],lShoulder:[225,98],rShoulder:[231,103],lElbow:[246,118],rElbow:[251,125],lWrist:[278,89],rWrist:[282,97],lAnkle:[118,264],rAnkle:[127,264]}),equipment:"wall-right",traces:["lAnkle"],desc:"Les avant-bras au mur, les pieds reculent pour aligner tête, bassin et chevilles."},
  "planche-inclinee":{a:pose(HIGH,{hip:[184,146],lKnee:[137,191],rKnee:[140,199],lAnkle:[100,218],rAnkle:[103,226],lWrist:[278,202],rWrist:[286,206]}),b:pose(HIGH,{lWrist:[278,202],rWrist:[286,206]}),equipment:"support-mid",traces:["hip"],desc:"Les mains sur un support, les pieds reculent et le bassin s'aligne avec les épaules et les chevilles."},
  planche:{a:pose(FOUR,{lElbow:[225,246],rElbow:[233,252],lWrist:[257,258],rWrist:[265,262]}),b:FOREARM_PLANK,equipment:"mat",traces:["lAnkle","hip"],desc:"Depuis les genoux, les jambes se tendent en appui sur les pointes de pieds pour former une planche sur les avant-bras."},
  "planche-laterale-genoux":{a:pose(SIDEPLANKLOW,{lKnee:[129,228],rKnee:[139,238],lAnkle:[104,256],rAnkle:[114,264]}),b:pose(SIDEPLANKHIGH,{lKnee:[129,202],rKnee:[139,211],lAnkle:[104,240],rAnkle:[114,248]}),equipment:"mat",traces:["hip"],desc:"En appui sur un avant-bras et les genoux pliés, le bassin se soulève en planche latérale courte."},
  "planche-laterale":{a:SIDEPLANKLOW,b:SIDEPLANKHIGH,equipment:"mat",traces:["hip"],desc:"En appui sur un avant-bras et les pieds empilés, le bassin se soulève pour former une ligne latérale."},
  "pallof-press-elastique":{a:pose(F,{lElbow:[158,108],rElbow:[202,108],lWrist:[170,118],rWrist:[190,118]}),b:pose(F,{lElbow:[168,135],rElbow:[192,135],lWrist:[171,162],rWrist:[189,162]}),equipment:"band-side",traces:["lWrist","rWrist"],desc:"Debout de côté à un ancrage, les mains partent de la poitrine et s'éloignent sans rotation du tronc."},
  "farmer-walk":{a:pose(F,{lWrist:[130,158],rWrist:[230,158],lKnee:[158,203],rKnee:[202,199],lAnkle:[148,264],rAnkle:[220,249]}),b:pose(F,{lWrist:[130,158],rWrist:[230,158],lKnee:[153,197],rKnee:[204,207],lAnkle:[135,247],rAnkle:[211,264]}),equipment:"farmer-loads",traces:["lAnkle","rAnkle"],desc:"Deux charges restent le long du corps pendant une marche alternée à petits pas."}
};

const joints=["head","neck","hip","lShoulder","rShoulder","lElbow","rElbow","lWrist","rWrist","lKnee","rKnee","lAnkle","rAnkle"];
const bones=[["neck","lShoulder"],["neck","rShoulder"],["neck","hip"],["lShoulder","lElbow"],["lElbow","lWrist"],["rShoulder","rElbow"],["rElbow","rWrist"],["hip","lKnee"],["lKnee","lAnkle"],["hip","rKnee"],["rKnee","rAnkle"]];
const anim=(attr,a,b)=>`<animate attributeName="${attr}" values="${a};${b};${a}" dur="2.8s" repeatCount="indefinite" keyTimes="0;.5;1" calcMode="spline" keySplines=".4 0 .2 1;.4 0 .2 1"/>`;
const line=(x1,y1,x2,y2,attrs="")=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" ${attrs}/>`;
const movingLine=(pa,pb,qa,qb,attrs="")=>`<line x1="${pa[0]}" y1="${pa[1]}" x2="${qa[0]}" y2="${qa[1]}" ${attrs}>${anim("x1",pa[0],pb[0])}${anim("y1",pa[1],pb[1])}${anim("x2",qa[0],qb[0])}${anim("y2",qa[1],qb[1])}</line>`;
const movingCircle=(a,b,r=8,fill="#0d1734")=>`<circle cx="${a[0]}" cy="${a[1]}" r="${r}" fill="${fill}">${anim("cx",a[0],b[0])}${anim("cy",a[1],b[1])}</circle>`;

function equipment(scene){
  const {a,b,equipment:e}=scene, teal="#118783",green="#58bf16",navy="#0d1734";
  const db=j=>movingCircle(a[j],b[j],9,navy)+movingLine([a[j][0]-11,a[j][1]],[b[j][0]-11,b[j][1]],[a[j][0]+11,a[j][1]],[b[j][0]+11,b[j][1]],`stroke="${navy}" stroke-width="5" stroke-linecap="round"`);
  const band=(anchor,j)=>movingLine(anchor,anchor,a[j],b[j],`stroke="${green}" stroke-width="5" stroke-dasharray="7 5" stroke-linecap="round"`);
  switch(e){
    case"chair":return'<path d="M112 164h70v13h-57v86h-13zM112 105h13v59h-13z" fill="#fff" stroke="#118783" stroke-width="5"/>';
    case"support-left":return'<path d="M74 75v190M56 75h36" stroke="#118783" stroke-width="7" stroke-linecap="round"/>';
    case"support-right":return'<path d="M285 72v193M267 72h36" stroke="#118783" stroke-width="7" stroke-linecap="round"/>';
    case"step":return'<path d="M210 224h92v40h-92z" fill="#118783" opacity=".58"/><path d="M210 224h92" stroke="#0d1734" stroke-width="5"/>';
    case"mat":return'<path d="M42 260h276" stroke="#118783" stroke-width="7" stroke-linecap="round" opacity=".28"/>';
    case"bench-back":return'<path d="M83 226h88v14H83zM96 239v27M158 239v27" stroke="#118783" stroke-width="6" fill="none"/>';
    case"bench-hip-load":return'<path d="M83 226h88v14H83zM96 239v27M158 239v27" stroke="#118783" stroke-width="6" fill="none"/>';
    case"goblet":return movingCircle(a.lWrist,b.lWrist,13,navy);
    case"dumbbells":return db("lWrist")+db("rWrist");
    case"leg-press":return'<path d="M105 85l-33 132h28l34-116zM295 77l30 82M286 83l39-14" stroke="#118783" stroke-width="8" fill="none"/><path d="M75 218h95" stroke="#118783" stroke-width="8"/>';
    case"leg-curl":return'<path d="M116 172h112v15H116zM136 187v78M214 187v78" fill="#118783" opacity=".5"/>'+movingCircle(a.lAnkle,b.lAnkle,12,teal);
    case"wall-right":return'<path d="M300 28v237" stroke="#118783" stroke-width="9" stroke-linecap="round" opacity=".65"/>';
    case"wall-back":return'<rect x="118" y="22" width="124" height="243" rx="8" fill="#ccefeb" opacity=".5"/><path d="M118 80h124M118 140h124M118 200h124" stroke="#118783" opacity=".25"/>';
    case"support-high":return'<path d="M264 188h76v14h-76zM314 202v63" fill="#118783" opacity=".62"/>';
    case"support-mid":return'<path d="M264 201h76v14h-76zM314 215v50" fill="#118783" opacity=".62"/>';
    case"support-low":return'<path d="M264 218h76v14h-76zM314 232v33" fill="#118783" opacity=".62"/>';
    case"chest-press":return'<path d="M119 145h55v14h-55zM119 159v106M106 97v69" stroke="#118783" stroke-width="7" fill="none"/>'+movingLine(a.lWrist,b.lWrist,[a.lWrist[0]+18,a.lWrist[1]],[b.lWrist[0]+18,b.lWrist[1]],`stroke="${teal}" stroke-width="7"`);
    case"bench-dumbbells":return'<path d="M82 228h130v13H82zM102 241v24M196 241v24" fill="#118783" opacity=".55"/>'+db("lWrist")+db("rWrist");
    case"scapula":return'<path d="M163 78q-15 17 0 36M197 78q15 17 0 36" fill="none" stroke="#58bf16" stroke-width="4" stroke-linecap="round"><animate attributeName="stroke-width" values="3;7;3" dur="2.8s" repeatCount="indefinite"/></path>';
    case"towel":return movingLine(a.lWrist,b.lWrist,a.rWrist,b.rWrist,`stroke="${teal}" stroke-width="13" stroke-linecap="round" opacity=".7"`)+movingLine(a.lWrist,b.lWrist,a.rWrist,b.rWrist,`stroke="#ffffff" stroke-width="3" stroke-dasharray="7 5"`);
    case"band-right":return band([326,108],"lWrist")+band([326,118],"rWrist")+'<path d="M318 113a8 8 0 1 0 16 0a8 8 0 1 0-16 0" fill="#118783"/>';
    case"one-arm-row":return'<path d="M202 220h55v12h-55zM246 232v33" fill="#118783" opacity=".58"/>'+db("rWrist");
    case"row-machine":return'<path d="M112 169h78v13h-78zM127 182v83M276 63v202" stroke="#118783" stroke-width="7" fill="none"/>'+band([278,126],"lWrist")+band([278,136],"rWrist");
    case"pulldown":return'<path d="M72 25h216M82 25v240M278 25v240" stroke="#118783" stroke-width="6" opacity=".45"/>'+movingLine(a.lWrist,b.lWrist,a.rWrist,b.rWrist,`stroke="${navy}" stroke-width="7" stroke-linecap="round"`);
    case"band-between":return movingLine(a.lWrist,b.lWrist,a.rWrist,b.rWrist,`stroke="${green}" stroke-width="5" stroke-dasharray="7 5"`);
    case"band-face":return band([326,91],"lWrist")+band([326,101],"rWrist")+'<path d="M318 96a8 8 0 1 0 16 0a8 8 0 1 0-16 0" fill="#118783"/>';
    case"band-side":return band([58,116],"lWrist")+band([58,124],"rWrist")+'<path d="M58 72v105" stroke="#118783" stroke-width="7"/>';
    case"farmer-loads":return db("lWrist")+db("rWrist")+'<rect x="105" y="163" width="50" height="34" rx="8" fill="#0d1734" opacity=".18"/><rect x="205" y="163" width="50" height="34" rx="8" fill="#0d1734" opacity=".18"/>';
    default:return"";
  }
}

function foregroundEquipment(scene){
  if(scene.equipment!=="bench-hip-load")return"";
  const {a,b}=scene,plate=(dx)=>`<circle cx="${a.hip[0]+dx}" cy="${a.hip[1]}" r="14" fill="#58bf16" stroke="#0d1734" stroke-width="4">${anim("cx",a.hip[0]+dx,b.hip[0]+dx)}${anim("cy",a.hip[1],b.hip[1])}</circle>`;
  return movingLine([a.hip[0]-42,a.hip[1]],[b.hip[0]-42,b.hip[1]],[a.hip[0]+42,a.hip[1]],[b.hip[0]+42,b.hip[1]],'stroke="#0d1734" stroke-width="7" stroke-linecap="round"')+plate(-38)+plate(38);
}

function traces(scene){
  return scene.traces.map(j=>{const a=scene.a[j],b=scene.b[j],mx=(a[0]+b[0])/2,my=(a[1]+b[1])/2-10;return `<path d="M${a[0]} ${a[1]} Q${mx} ${my} ${b[0]} ${b[1]}" fill="none" stroke="#58bf16" stroke-width="3" stroke-dasharray="5 5" marker-end="url(#arrow)" opacity=".9"/>`;}).join("");
}

export function renderExerciseSvg(item){
  const scene=scenes[item.slug];
  if(!scene)throw new Error(`Scène d'animation absente : ${item.slug}`);
  const boneSvg=bones.map(([u,v])=>movingLine(scene.a[u],scene.b[u],scene.a[v],scene.b[v],'stroke="#0d1734" stroke-width="12" stroke-linecap="round"')).join("");
  const jointSvg=joints.filter(x=>x!=="head").map(j=>movingCircle(scene.a[j],scene.b[j],6,"#118783")).join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 300" role="img" aria-labelledby="title desc"><title id="title">${item.nom}</title><desc id="desc">${scene.desc}</desc><defs><marker id="arrow" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0 0L7 3.5L0 7z" fill="#58bf16"/></marker></defs><rect width="360" height="300" rx="28" fill="#e7f7f4"/><path d="M35 267h290" stroke="#ccefeb" stroke-width="4" stroke-linecap="round"/>${traces(scene)}${equipment(scene)}<g>${boneSvg}${jointSvg}${movingCircle(scene.a.head,scene.b.head,20,"#0d1734")}</g>${foregroundEquipment(scene)}<circle cx="326" cy="26" r="9" fill="#58bf16"><animate attributeName="opacity" values=".35;1;.35" dur="2.8s" repeatCount="indefinite"/></circle></svg>`;
}

export function renderExerciseSnapshotSvg(item,phase="start"){
  const pick=phase==="end"?1:0;
  return renderExerciseSvg(item).replace(/<(line|circle)([^>]*)>([\s\S]*?)<\/\1>/g,(whole,tag,attrs,inner)=>{
    let next=attrs;
    for(const match of inner.matchAll(/<animate attributeName="([^"]+)" values="([^;"]+);([^;"]+);[^"]+"[^>]*\/>/g)){
      const value=pick?match[3]:match[2];
      const attr=new RegExp(`\\s${match[1]}="[^"]*"`);
      next=attr.test(next)?next.replace(attr,` ${match[1]}="${value}"`):`${next} ${match[1]}="${value}"`;
    }
    return `<${tag}${next}>${inner.replace(/<animate\b[^>]*\/>/g,"")}</${tag}>`;
  }).replace(/<animate\b[^>]*\/>/g,"");
}

export const animationSceneSlugs=Object.keys(scenes);
export const sceneFingerprint=slug=>JSON.stringify(scenes[slug]);
export const animationAuditRows=Object.entries(scenes).map(([slug,s])=>({slug,equipment:s.equipment,traces:s.traces.length,description:s.desc}));
