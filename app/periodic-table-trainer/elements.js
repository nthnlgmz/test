// Elements 1–118 as "Name Symbol", in atomic-number order.
const RAW = "Hydrogen H,Helium He,Lithium Li,Beryllium Be,Boron B,Carbon C,Nitrogen N,Oxygen O,Fluorine F,Neon Ne,Sodium Na,Magnesium Mg,Aluminum Al,Silicon Si,Phosphorus P,Sulfur S,Chlorine Cl,Argon Ar,Potassium K,Calcium Ca,Scandium Sc,Titanium Ti,Vanadium V,Chromium Cr,Manganese Mn,Iron Fe,Cobalt Co,Nickel Ni,Copper Cu,Zinc Zn,Gallium Ga,Germanium Ge,Arsenic As,Selenium Se,Bromine Br,Krypton Kr,Rubidium Rb,Strontium Sr,Yttrium Y,Zirconium Zr,Niobium Nb,Molybdenum Mo,Technetium Tc,Ruthenium Ru,Rhodium Rh,Palladium Pd,Silver Ag,Cadmium Cd,Indium In,Tin Sn,Antimony Sb,Tellurium Te,Iodine I,Xenon Xe,Cesium Cs,Barium Ba,Lanthanum La,Cerium Ce,Praseodymium Pr,Neodymium Nd,Promethium Pm,Samarium Sm,Europium Eu,Gadolinium Gd,Terbium Tb,Dysprosium Dy,Holmium Ho,Erbium Er,Thulium Tm,Ytterbium Yb,Lutetium Lu,Hafnium Hf,Tantalum Ta,Tungsten W,Rhenium Re,Osmium Os,Iridium Ir,Platinum Pt,Gold Au,Mercury Hg,Thallium Tl,Lead Pb,Bismuth Bi,Polonium Po,Astatine At,Radon Rn,Francium Fr,Radium Ra,Actinium Ac,Thorium Th,Protactinium Pa,Uranium U,Neptunium Np,Plutonium Pu,Americium Am,Curium Cm,Berkelium Bk,Californium Cf,Einsteinium Es,Fermium Fm,Mendelevium Md,Nobelium No,Lawrencium Lr,Rutherfordium Rf,Dubnium Db,Seaborgium Sg,Bohrium Bh,Hassium Hs,Meitnerium Mt,Darmstadtium Ds,Roentgenium Rg,Copernicium Cn,Nihonium Nh,Flerovium Fl,Moscovium Mc,Livermorium Lv,Tennessine Ts,Oganesson Og";

export const ELEMENTS = RAW.split(",").map((s, i) => {
  const [name, symbol] = s.split(" ");
  return { Z: i + 1, name, symbol };
});

const GROUPS = {
  "alkali metal": "Li Na K Rb Cs Fr",
  "alkaline earth metal": "Be Mg Ca Sr Ba Ra",
  halogen: "F Cl Br I At Ts",
  "noble gas": "He Ne Ar Kr Xe Rn Og",
  "transition metal": "Sc Ti V Cr Mn Fe Co Ni Cu Zn Y Zr Nb Mo Tc Ru Rh Pd Ag Cd Hf Ta W Re Os Ir Pt Au Hg Rf Db Sg Bh Hs Mt Ds Rg Cn",
  metalloid: "B Si Ge As Sb Te",
  "post-transition metal": "Al Ga In Sn Tl Pb Bi Po Nh Fl Mc Lv",
  nonmetal: "H C N O P S Se",
};

export const COLORS = {
  "alkali metal": "#ff6b9d", "alkaline earth metal": "#ff9f43", "transition metal": "#ffd93d",
  "post-transition metal": "#8fa8ff", metalloid: "#7de2b5", nonmetal: "#b6f04c",
  halogen: "#4dd4f0", "noble gas": "#c79bff", lanthanoid: "#ff8a80", actinoid: "#d9c2a0", unknown: "#e5e5e5",
};

export function category(el) {
  if (el.Z >= 57 && el.Z <= 71) return "lanthanoid";
  if (el.Z >= 89 && el.Z <= 103) return "actinoid";
  for (const k in GROUPS) if (GROUPS[k].split(" ").includes(el.symbol)) return k;
  return "unknown";
}
