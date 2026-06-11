const PRODUCTS = ["Ultra Green", "Amino Power", "Amino16", "Amino Cell Antistress", "Amino 16 BZn", "Fruitfix", "Granbrix", "MicroRS", "NF Hyd1", "BMC Fixer", "Amino Cell S", "Amino Cell PK", "Amino Cell Si 3%"];
const PRODUCT_DATA = {
  "Ultra Green": {
    "general": {
      "pH at 25oC": {
        "range": "2.8-3.2",
        "mid": 3.0
      },
      "Conductivity at 25oC": {
        "range": "80-90",
        "mid": 85.0
      },
      "Sp. Weight at 20oC": {
        "range": "1.12-1.14",
        "mid": 1.13
      }
    },
    "content": {
      "Free L-Amino Acids (% w/w)": 6.4,
      "Total Amino Acids (% w/w)": 12.32,
      "Extract of seaweed Ascophyllum Nodosum (% w/w)": null,
      "Polysaccharides (% w/w)": null,
      "Nitrogen Total": {
        "range": "1.8-2.2",
        "mid": 2.0
      },
      "Phosphorous Total": null,
      "Potassium (K)": null,
      "Sulfur": null,
      "Silicon": null,
      "Boron": null,
      "Zinc": null
    },
    "aminoacids_free": {
      "Alanine (Ala)": 0.39,
      "Arginine (Arg)": 0.48,
      "Aspartic Acid (Asp)": 0.96,
      "Glutamic Acid (Glu)": 1.61,
      "Glycine (Gly)": 0.63,
      "Histidine (His)": 0.14,
      "Isoleucine (Ile)": 0.11,
      "Leucine (Leu)": 0.34,
      "Lysine (Lys)": 0.25,
      "Methionine (Met)": 0.12,
      "Phenylalanine (Phe)": 0.26,
      "Proline (Pro)": 0.27,
      "Serine (Ser)": 0.35,
      "Threonine (Thr)": 0.2,
      "Tyrosine (Tyr)": 0.14,
      "Valine (Val)": 0.15,
      "Cystine (Cys)": null,
      "Tryptophan (Trp)": null
    },
    "aminoacids_total": {
      "Alanine (Ala)": 0.65,
      "Arginine (Arg)": 0.88,
      "Aspartic Acid (Asp)": 1.23,
      "Glutamic Acid (Glu)": 2.75,
      "Glycine (Gly)": 0.84,
      "Histidine (His)": 0.31,
      "Isoleucine (Ile)": 0.6,
      "Leucine (Leu)": 0.8,
      "Lysine (Lys)": 0.49,
      "Methionine (Met)": 0.34,
      "Phenylalanine (Phe)": 0.57,
      "Proline (Pro)": 0.7,
      "Serine (Ser)": 0.56,
      "Threonine (Thr)": 0.51,
      "Tyrosine (Tyr)": 0.39,
      "Valine (Val)": 0.7,
      "Cystine (Cys)": null,
      "Tryptophan (Trp)": null
    },
    "osmolytes": {
      "Betaine": null,
      "Mannitol": null
    },
    "sugars": {
      "Glucose": null,
      "Fructose": null,
      "Sucrose": null,
      "Maltose": null,
      "Lactose": null,
      "Total Sugars": null
    },
    "phytohormones": {
      "Indole-3-Butyric Acid (mg IBA/kg)": null,
      "Indole-3-Acetic Acid (mg IAA/kg)": null,
      "Cytokinin (mg Kinetin/kg)": null,
      "Gibberellin (mg GA/kg)": null,
      "Absisic Acid (mg ABA/kg)": null,
      "Ethylene (< of)": null
    },
    "microorganisms": {
      "Bacillus megaterium": null,
      "Bacillus licheniformis": null,
      "Bacillus suptilis": null,
      "Azotobacter chroococcum": null,
      "Azotobacter vinelandii": null,
      "Derxia sp": null
    },
    "scores": {
      "Nitrogen Metabolism & Protein Synthesis": 4.0,
      "Stress Tolerance & Osmoregulation": 2.5,
      "Root Development & Nutrient Uptake": 1.5,
      "Photosynthesis & Energy Metabolism": 3.5,
      "Growth Regulation & Hormone Precursors": 3.5,
      "Reproductive Development & Quality": 2.0
    }
  },
  "Amino Power": {
    "general": {
      "pH at 25oC": {
        "range": "2.8-3.2",
        "mid": 3.0
      },
      "Conductivity at 25oC": {
        "range": "65-85",
        "mid": 75.0
      },
      "Sp. Weight at 20oC": {
        "range": "1.11-1.13",
        "mid": 1.12
      }
    },
    "content": {
      "Free L-Amino Acids (% w/w)": 10.04,
      "Total Amino Acids (% w/w)": 14.49,
      "Extract of seaweed Ascophyllum Nodosum (% w/w)": null,
      "Polysaccharides (% w/w)": null,
      "Nitrogen Total": {
        "range": "2.1-2.5",
        "mid": 2.3
      },
      "Phosphorous Total": null,
      "Potassium (K)": null,
      "Sulfur": null,
      "Silicon": null,
      "Boron": null,
      "Zinc": null
    },
    "aminoacids_free": {
      "Alanine (Ala)": 0.78,
      "Arginine (Arg)": 0.31,
      "Aspartic Acid (Asp)": 1.06,
      "Glutamic Acid (Glu)": 1.75,
      "Glycine (Gly)": 0.27,
      "Histidine (His)": 0.17,
      "Isoleucine (Ile)": 0.45,
      "Leucine (Leu)": 1.19,
      "Lysine (Lys)": 0.5,
      "Methionine (Met)": 0.14,
      "Phenylalanine (Phe)": 0.81,
      "Proline (Pro)": 0.74,
      "Serine (Ser)": 0.58,
      "Threonine (Thr)": 0.42,
      "Tyrosine (Tyr)": 0.34,
      "Valine (Val)": 0.43,
      "Cystine (Cys)": 0.08,
      "Tryptophan (Trp)": 0.02
    },
    "aminoacids_total": {
      "Alanine (Ala)": 1.0,
      "Arginine (Arg)": 0.74,
      "Aspartic Acid (Asp)": 1.13,
      "Glutamic Acid (Glu)": 2.45,
      "Glycine (Gly)": 0.72,
      "Histidine (His)": 0.34,
      "Isoleucine (Ile)": 0.64,
      "Leucine (Leu)": 1.55,
      "Lysine (Lys)": 0.59,
      "Methionine (Met)": 0.28,
      "Phenylalanine (Phe)": 1.38,
      "Proline (Pro)": 0.95,
      "Serine (Ser)": 0.67,
      "Threonine (Thr)": 0.63,
      "Tyrosine (Tyr)": 0.51,
      "Valine (Val)": 0.76,
      "Cystine (Cys)": 0.12,
      "Tryptophan (Trp)": 0.03
    },
    "osmolytes": {
      "Betaine": null,
      "Mannitol": null
    },
    "sugars": {
      "Glucose": null,
      "Fructose": null,
      "Sucrose": null,
      "Maltose": null,
      "Lactose": null,
      "Total Sugars": null
    },
    "phytohormones": {
      "Indole-3-Butyric Acid (mg IBA/kg)": 16.0,
      "Indole-3-Acetic Acid (mg IAA/kg)": null,
      "Cytokinin (mg Kinetin/kg)": 69.0,
      "Gibberellin (mg GA/kg)": 0.5,
      "Absisic Acid (mg ABA/kg)": 0.01,
      "Ethylene (< of)": 1.0
    },
    "microorganisms": {
      "Bacillus megaterium": null,
      "Bacillus licheniformis": null,
      "Bacillus suptilis": null,
      "Azotobacter chroococcum": null,
      "Azotobacter vinelandii": null,
      "Derxia sp": null
    },
    "scores": {
      "Nitrogen Metabolism & Protein Synthesis": 9.0,
      "Stress Tolerance & Osmoregulation": 3.0,
      "Root Development & Nutrient Uptake": 3.0,
      "Photosynthesis & Energy Metabolism": 4.5,
      "Growth Regulation & Hormone Precursors": 6.0,
      "Reproductive Development & Quality": 4.5
    }
  },
  "Amino16": {
    "general": {
      "pH at 25oC": {
        "range": "2.8-3.2",
        "mid": 3.0
      },
      "Conductivity at 25oC": {
        "range": "65.5-85.5",
        "mid": 75.5
      },
      "Sp. Weight at 20oC": {
        "range": "1.15-1.17",
        "mid": 1.16
      }
    },
    "content": {
      "Free L-Amino Acids (% w/w)": 11.89,
      "Total Amino Acids (% w/w)": 19.0,
      "Extract of seaweed Ascophyllum Nodosum (% w/w)": null,
      "Polysaccharides (% w/w)": null,
      "Nitrogen Total": {
        "range": "2.8-3.2",
        "mid": 3.0
      },
      "Phosphorous Total": null,
      "Potassium (K)": null,
      "Sulfur": null,
      "Silicon": null,
      "Boron": null,
      "Zinc": null
    },
    "aminoacids_free": {
      "Alanine (Ala)": 0.94,
      "Arginine (Arg)": 0.68,
      "Aspartic Acid (Asp)": 1.23,
      "Glutamic Acid (Glu)": 2.75,
      "Glycine (Gly)": 0.51,
      "Histidine (His)": 0.32,
      "Isoleucine (Ile)": 0.27,
      "Leucine (Leu)": 0.97,
      "Lysine (Lys)": 0.35,
      "Methionine (Met)": 0.25,
      "Phenylalanine (Phe)": 0.43,
      "Proline (Pro)": 1.01,
      "Serine (Ser)": 0.65,
      "Threonine (Thr)": 0.37,
      "Tyrosine (Tyr)": 0.42,
      "Valine (Val)": 0.74,
      "Cystine (Cys)": null,
      "Tryptophan (Trp)": null
    },
    "aminoacids_total": {
      "Alanine (Ala)": 1.01,
      "Arginine (Arg)": 0.98,
      "Aspartic Acid (Asp)": 1.35,
      "Glutamic Acid (Glu)": 4.48,
      "Glycine (Gly)": 0.69,
      "Histidine (His)": 0.66,
      "Isoleucine (Ile)": 0.85,
      "Leucine (Leu)": 1.72,
      "Lysine (Lys)": 0.57,
      "Methionine (Met)": 0.35,
      "Phenylalanine (Phe)": 0.98,
      "Proline (Pro)": 1.8,
      "Serine (Ser)": 0.84,
      "Threonine (Thr)": 0.89,
      "Tyrosine (Tyr)": 0.88,
      "Valine (Val)": 0.95,
      "Cystine (Cys)": null,
      "Tryptophan (Trp)": null
    },
    "osmolytes": {
      "Betaine": 0.18,
      "Mannitol": 0.25
    },
    "sugars": {
      "Glucose": 0.2,
      "Fructose": 0.14,
      "Sucrose": 0.03,
      "Maltose": 0.08,
      "Lactose": {
        "label": "<0.02",
        "num": 0.02
      },
      "Total Sugars": 0.45
    },
    "phytohormones": {
      "Indole-3-Butyric Acid (mg IBA/kg)": 22.0,
      "Indole-3-Acetic Acid (mg IAA/kg)": null,
      "Cytokinin (mg Kinetin/kg)": 116.0,
      "Gibberellin (mg GA/kg)": 1.29,
      "Absisic Acid (mg ABA/kg)": 0.015,
      "Ethylene (< of)": 1.0
    },
    "microorganisms": {
      "Bacillus megaterium": null,
      "Bacillus licheniformis": null,
      "Bacillus suptilis": null,
      "Azotobacter chroococcum": null,
      "Azotobacter vinelandii": null,
      "Derxia sp": null
    },
    "scores": {
      "Nitrogen Metabolism & Protein Synthesis": 7.0,
      "Stress Tolerance & Osmoregulation": 4.0,
      "Root Development & Nutrient Uptake": 4.0,
      "Photosynthesis & Energy Metabolism": 4.0,
      "Growth Regulation & Hormone Precursors": 5.0,
      "Reproductive Development & Quality": 4.0
    }
  },
  "Amino Cell Antistress": {
    "general": {
      "pH at 25oC": {
        "range": "2.8-3.2",
        "mid": 3.0
      },
      "Conductivity at 25oC": {
        "range": "65-85",
        "mid": 75.0
      },
      "Sp. Weight at 20oC": {
        "range": "1.16-1.18",
        "mid": 1.17
      }
    },
    "content": {
      "Free L-Amino Acids (% w/w)": 14.5,
      "Total Amino Acids (% w/w)": 18.67,
      "Extract of seaweed Ascophyllum Nodosum (% w/w)": null,
      "Polysaccharides (% w/w)": null,
      "Nitrogen Total": {
        "range": "2.8-3.2",
        "mid": 3.0
      },
      "Phosphorous Total": null,
      "Potassium (K)": null,
      "Sulfur": null,
      "Silicon": null,
      "Boron": null,
      "Zinc": null
    },
    "aminoacids_free": {
      "Alanine (Ala)": 1.01,
      "Arginine (Arg)": 0.51,
      "Aspartic Acid (Asp)": 1.17,
      "Glutamic Acid (Glu)": 3.53,
      "Glycine (Gly)": 0.42,
      "Histidine (His)": 0.29,
      "Isoleucine (Ile)": 0.52,
      "Leucine (Leu)": 1.63,
      "Lysine (Lys)": 0.3,
      "Methionine (Met)": 0.24,
      "Phenylalanine (Phe)": 0.7,
      "Proline (Pro)": 1.64,
      "Serine (Ser)": 0.7,
      "Threonine (Thr)": 0.54,
      "Tyrosine (Tyr)": 0.66,
      "Valine (Val)": 0.53,
      "Cystine (Cys)": 0.08,
      "Tryptophan (Trp)": 0.03
    },
    "aminoacids_total": {
      "Alanine (Ala)": 1.14,
      "Arginine (Arg)": 0.72,
      "Aspartic Acid (Asp)": 1.37,
      "Glutamic Acid (Glu)": 4.25,
      "Glycine (Gly)": 0.46,
      "Histidine (His)": 0.4,
      "Isoleucine (Ile)": 0.9,
      "Leucine (Leu)": 2.54,
      "Lysine (Lys)": 0.57,
      "Methionine (Met)": 0.39,
      "Phenylalanine (Phe)": 0.89,
      "Proline (Pro)": 1.71,
      "Serine (Ser)": 0.86,
      "Threonine (Thr)": 0.66,
      "Tyrosine (Tyr)": 0.77,
      "Valine (Val)": 0.93,
      "Cystine (Cys)": 0.08,
      "Tryptophan (Trp)": 0.03
    },
    "osmolytes": {
      "Betaine": 0.2,
      "Mannitol": 0.29
    },
    "sugars": {
      "Glucose": 0.19,
      "Fructose": 0.13,
      "Sucrose": 0.03,
      "Maltose": 0.1,
      "Lactose": {
        "label": "<0.02",
        "num": 0.02
      },
      "Total Sugars": 0.45
    },
    "phytohormones": {
      "Indole-3-Butyric Acid (mg IBA/kg)": 25.7,
      "Indole-3-Acetic Acid (mg IAA/kg)": 38.7,
      "Cytokinin (mg Kinetin/kg)": 112.0,
      "Gibberellin (mg GA/kg)": 1.32,
      "Absisic Acid (mg ABA/kg)": 0.015,
      "Ethylene (< of)": null
    },
    "microorganisms": {
      "Bacillus megaterium": null,
      "Bacillus licheniformis": null,
      "Bacillus suptilis": null,
      "Azotobacter chroococcum": null,
      "Azotobacter vinelandii": null,
      "Derxia sp": null
    },
    "scores": {
      "Nitrogen Metabolism & Protein Synthesis": 7.0,
      "Stress Tolerance & Osmoregulation": 6.0,
      "Root Development & Nutrient Uptake": 4.0,
      "Photosynthesis & Energy Metabolism": 4.5,
      "Growth Regulation & Hormone Precursors": 5.5,
      "Reproductive Development & Quality": 4.5
    }
  },
  "Amino 16 BZn": {
    "general": {
      "pH at 25oC": {
        "label": "3-3.4"
      },
      "Conductivity at 25oC": {
        "range": "65-85",
        "mid": 75.0
      },
      "Sp. Weight at 20oC": {
        "range": "1.16-1.18",
        "mid": 1.17
      }
    },
    "content": {
      "Free L-Amino Acids (% w/w)": 10.0,
      "Total Amino Acids (% w/w)": 15.53,
      "Extract of seaweed Ascophyllum Nodosum (% w/w)": null,
      "Polysaccharides (% w/w)": null,
      "Nitrogen Total": {
        "range": "2.8-3.2",
        "mid": 3.0
      },
      "Phosphorous Total": null,
      "Potassium (K)": null,
      "Sulfur": null,
      "Silicon": null,
      "Boron": {
        "range": "0.4-0.6",
        "mid": 0.5
      },
      "Zinc": {
        "range": "0.7-0.9",
        "mid": 0.8
      }
    },
    "aminoacids_free": {
      "Alanine (Ala)": 0.78,
      "Arginine (Arg)": 0.59,
      "Aspartic Acid (Asp)": 1.04,
      "Glutamic Acid (Glu)": 2.28,
      "Glycine (Gly)": 0.48,
      "Histidine (His)": 0.29,
      "Isoleucine (Ile)": 0.25,
      "Leucine (Leu)": 0.84,
      "Lysine (Lys)": 0.29,
      "Methionine (Met)": 0.2,
      "Phenylalanine (Phe)": 0.35,
      "Proline (Pro)": 0.83,
      "Serine (Ser)": 0.53,
      "Threonine (Thr)": 0.3,
      "Tyrosine (Tyr)": 0.34,
      "Valine (Val)": 0.61,
      "Cystine (Cys)": null,
      "Tryptophan (Trp)": null
    },
    "aminoacids_total": {
      "Alanine (Ala)": 0.83,
      "Arginine (Arg)": 0.8,
      "Aspartic Acid (Asp)": 1.1,
      "Glutamic Acid (Glu)": 3.66,
      "Glycine (Gly)": 0.56,
      "Histidine (His)": 0.54,
      "Isoleucine (Ile)": 0.69,
      "Leucine (Leu)": 1.41,
      "Lysine (Lys)": 0.47,
      "Methionine (Met)": 0.29,
      "Phenylalanine (Phe)": 0.8,
      "Proline (Pro)": 1.47,
      "Serine (Ser)": 0.69,
      "Threonine (Thr)": 0.73,
      "Tyrosine (Tyr)": 0.72,
      "Valine (Val)": 0.78,
      "Cystine (Cys)": null,
      "Tryptophan (Trp)": null
    },
    "osmolytes": {
      "Betaine": null,
      "Mannitol": null
    },
    "sugars": {
      "Glucose": null,
      "Fructose": null,
      "Sucrose": null,
      "Maltose": null,
      "Lactose": null,
      "Total Sugars": null
    },
    "phytohormones": {
      "Indole-3-Butyric Acid (mg IBA/kg)": 17.9,
      "Indole-3-Acetic Acid (mg IAA/kg)": null,
      "Cytokinin (mg Kinetin/kg)": 94.7,
      "Gibberellin (mg GA/kg)": 1.05,
      "Absisic Acid (mg ABA/kg)": 0.011,
      "Ethylene (< of)": null
    },
    "microorganisms": {
      "Bacillus megaterium": null,
      "Bacillus licheniformis": null,
      "Bacillus suptilis": null,
      "Azotobacter chroococcum": null,
      "Azotobacter vinelandii": null,
      "Derxia sp": null
    },
    "scores": {
      "Nitrogen Metabolism & Protein Synthesis": 7.0,
      "Stress Tolerance & Osmoregulation": 3.0,
      "Root Development & Nutrient Uptake": 2.0,
      "Photosynthesis & Energy Metabolism": 5.0,
      "Growth Regulation & Hormone Precursors": 6.0,
      "Reproductive Development & Quality": 7.0
    }
  },
  "Fruitfix": {
    "general": {
      "pH at 25oC": {
        "range": "2.8-3.2",
        "mid": 3.0
      },
      "Conductivity at 25oC": {
        "range": "45-65",
        "mid": 55.0
      },
      "Sp. Weight at 20oC": {
        "range": "1.18-1.2",
        "mid": 1.19
      }
    },
    "content": {
      "Free L-Amino Acids (% w/w)": 8.03,
      "Total Amino Acids (% w/w)": 15.37,
      "Extract of seaweed Ascophyllum Nodosum (% w/w)": 5.25,
      "Polysaccharides (% w/w)": null,
      "Nitrogen Total": {
        "range": "2.8-3.2",
        "mid": 3.0
      },
      "Phosphorous Total": null,
      "Potassium (K)": null,
      "Sulfur": null,
      "Silicon": null,
      "Boron": null,
      "Zinc": null
    },
    "aminoacids_free": {
      "Alanine (Ala)": 0.63,
      "Arginine (Arg)": 0.46,
      "Aspartic Acid (Asp)": 0.83,
      "Glutamic Acid (Glu)": 1.86,
      "Glycine (Gly)": 0.29,
      "Histidine (His)": 0.22,
      "Isoleucine (Ile)": 0.18,
      "Leucine (Leu)": 0.65,
      "Lysine (Lys)": 0.24,
      "Methionine (Met)": 0.17,
      "Phenylalanine (Phe)": 0.29,
      "Proline (Pro)": 0.68,
      "Serine (Ser)": 0.44,
      "Threonine (Thr)": 0.25,
      "Tyrosine (Tyr)": 0.28,
      "Valine (Val)": 0.5,
      "Cystine (Cys)": null,
      "Tryptophan (Trp)": null
    },
    "aminoacids_total": {
      "Alanine (Ala)": 0.82,
      "Arginine (Arg)": 0.73,
      "Aspartic Acid (Asp)": 1.14,
      "Glutamic Acid (Glu)": 2.91,
      "Glycine (Gly)": 0.3,
      "Histidine (His)": 0.42,
      "Isoleucine (Ile)": 0.64,
      "Leucine (Leu)": 2.28,
      "Lysine (Lys)": 0.61,
      "Methionine (Met)": 0.21,
      "Phenylalanine (Phe)": 1.12,
      "Proline (Pro)": 1.43,
      "Serine (Ser)": 0.64,
      "Threonine (Thr)": 0.38,
      "Tyrosine (Tyr)": 0.63,
      "Valine (Val)": 1.11,
      "Cystine (Cys)": null,
      "Tryptophan (Trp)": null
    },
    "osmolytes": {
      "Betaine": null,
      "Mannitol": null
    },
    "sugars": {
      "Glucose": null,
      "Fructose": null,
      "Sucrose": null,
      "Maltose": null,
      "Lactose": null,
      "Total Sugars": null
    },
    "phytohormones": {
      "Indole-3-Butyric Acid (mg IBA/kg)": 30.5,
      "Indole-3-Acetic Acid (mg IAA/kg)": 32.0,
      "Cytokinin (mg Kinetin/kg)": 129.0,
      "Gibberellin (mg GA/kg)": 1.04,
      "Absisic Acid (mg ABA/kg)": 0.011,
      "Ethylene (< of)": null
    },
    "microorganisms": {
      "Bacillus megaterium": null,
      "Bacillus licheniformis": null,
      "Bacillus suptilis": null,
      "Azotobacter chroococcum": null,
      "Azotobacter vinelandii": null,
      "Derxia sp": null
    },
    "scores": {
      "Nitrogen Metabolism & Protein Synthesis": 6.5,
      "Stress Tolerance & Osmoregulation": 3.0,
      "Root Development & Nutrient Uptake": 2.5,
      "Photosynthesis & Energy Metabolism": 5.5,
      "Growth Regulation & Hormone Precursors": 6.5,
      "Reproductive Development & Quality": 3.0
    }
  },
  "Granbrix": {
    "general": {
      "pH at 25oC": {
        "range": "3.7-4.1",
        "mid": 3.9
      },
      "Conductivity at 25oC": {
        "range": "25-45",
        "mid": 35.0
      },
      "Sp. Weight at 20oC": {
        "range": "1.22-1.24",
        "mid": 1.23
      }
    },
    "content": {
      "Free L-Amino Acids (% w/w)": 7.29,
      "Total Amino Acids (% w/w)": 14.38,
      "Extract of seaweed Ascophyllum Nodosum (% w/w)": 4.0,
      "Polysaccharides (% w/w)": 8.0,
      "Nitrogen Total": {
        "range": "2.1-2.5",
        "mid": 2.3
      },
      "Phosphorous Total": null,
      "Potassium (K)": null,
      "Sulfur": null,
      "Silicon": null,
      "Boron": null,
      "Zinc": null
    },
    "aminoacids_free": {
      "Alanine (Ala)": 0.58,
      "Arginine (Arg)": 0.24,
      "Aspartic Acid (Asp)": 0.84,
      "Glutamic Acid (Glu)": 2.11,
      "Glycine (Gly)": 0.19,
      "Histidine (His)": 0.11,
      "Isoleucine (Ile)": 0.14,
      "Leucine (Leu)": 0.92,
      "Lysine (Lys)": 0.19,
      "Methionine (Met)": 0.15,
      "Phenylalanine (Phe)": 0.29,
      "Proline (Pro)": 0.55,
      "Serine (Ser)": 0.46,
      "Threonine (Thr)": 0.16,
      "Tyrosine (Tyr)": 0.2,
      "Valine (Val)": 0.16,
      "Cystine (Cys)": null,
      "Tryptophan (Trp)": null
    },
    "aminoacids_total": {
      "Alanine (Ala)": 1.05,
      "Arginine (Arg)": 0.5,
      "Aspartic Acid (Asp)": 0.92,
      "Glutamic Acid (Glu)": 3.11,
      "Glycine (Gly)": 0.62,
      "Histidine (His)": 0.3,
      "Isoleucine (Ile)": 0.56,
      "Leucine (Leu)": 2.11,
      "Lysine (Lys)": 0.32,
      "Methionine (Met)": 0.33,
      "Phenylalanine (Phe)": 0.89,
      "Proline (Pro)": 1.36,
      "Serine (Ser)": 0.81,
      "Threonine (Thr)": 0.41,
      "Tyrosine (Tyr)": 0.68,
      "Valine (Val)": 0.41,
      "Cystine (Cys)": null,
      "Tryptophan (Trp)": null
    },
    "osmolytes": {
      "Betaine": null,
      "Mannitol": null
    },
    "sugars": {
      "Glucose": null,
      "Fructose": null,
      "Sucrose": null,
      "Maltose": null,
      "Lactose": null,
      "Total Sugars": null
    },
    "phytohormones": {
      "Indole-3-Butyric Acid (mg IBA/kg)": 24.0,
      "Indole-3-Acetic Acid (mg IAA/kg)": 26.0,
      "Cytokinin (mg Kinetin/kg)": 103.0,
      "Gibberellin (mg GA/kg)": 0.832,
      "Absisic Acid (mg ABA/kg)": 0.009,
      "Ethylene (< of)": null
    },
    "microorganisms": {
      "Bacillus megaterium": null,
      "Bacillus licheniformis": null,
      "Bacillus suptilis": null,
      "Azotobacter chroococcum": null,
      "Azotobacter vinelandii": null,
      "Derxia sp": null
    },
    "scores": {
      "Nitrogen Metabolism & Protein Synthesis": 6.5,
      "Stress Tolerance & Osmoregulation": 3.0,
      "Root Development & Nutrient Uptake": 2.5,
      "Photosynthesis & Energy Metabolism": 4.5,
      "Growth Regulation & Hormone Precursors": 8.0,
      "Reproductive Development & Quality": 3.5
    }
  },
  "MicroRS": {
    "general": {
      "pH at 25oC": {
        "range": "2.8-3.2",
        "mid": 3.0
      },
      "Conductivity at 25oC": {
        "range": "60-80",
        "mid": 70.0
      },
      "Sp. Weight at 20oC": {
        "range": "1.15-1.17",
        "mid": 1.16
      }
    },
    "content": {
      "Free L-Amino Acids (% w/w)": 10.7,
      "Total Amino Acids (% w/w)": 19.6,
      "Extract of seaweed Ascophyllum Nodosum (% w/w)": null,
      "Polysaccharides (% w/w)": null,
      "Nitrogen Total": {
        "range": "2.8-3.2",
        "mid": 3.0
      },
      "Phosphorous Total": null,
      "Potassium (K)": null,
      "Sulfur": null,
      "Silicon": null,
      "Boron": null,
      "Zinc": null
    },
    "aminoacids_free": {
      "Alanine (Ala)": 0.93,
      "Arginine (Arg)": 0.38,
      "Aspartic Acid (Asp)": 1.32,
      "Glutamic Acid (Glu)": 3.15,
      "Glycine (Gly)": 0.23,
      "Histidine (His)": 0.15,
      "Isoleucine (Ile)": 0.19,
      "Leucine (Leu)": 1.36,
      "Lysine (Lys)": 0.3,
      "Methionine (Met)": 0.07,
      "Phenylalanine (Phe)": 0.4,
      "Proline (Pro)": 0.67,
      "Serine (Ser)": 0.69,
      "Threonine (Thr)": 0.26,
      "Tyrosine (Tyr)": 0.3,
      "Valine (Val)": 0.18,
      "Cystine (Cys)": 0.09,
      "Tryptophan (Trp)": 0.03
    },
    "aminoacids_total": {
      "Alanine (Ala)": 1.36,
      "Arginine (Arg)": 0.73,
      "Aspartic Acid (Asp)": 1.5,
      "Glutamic Acid (Glu)": 4.09,
      "Glycine (Gly)": 0.72,
      "Histidine (His)": 0.38,
      "Isoleucine (Ile)": 0.7,
      "Leucine (Leu)": 2.99,
      "Lysine (Lys)": 0.57,
      "Methionine (Met)": 0.23,
      "Phenylalanine (Phe)": 1.08,
      "Proline (Pro)": 1.77,
      "Serine (Ser)": 0.93,
      "Threonine (Thr)": 0.66,
      "Tyrosine (Tyr)": 0.95,
      "Valine (Val)": 0.73,
      "Cystine (Cys)": 0.23,
      "Tryptophan (Trp)": 0.03
    },
    "osmolytes": {
      "Betaine": null,
      "Mannitol": null
    },
    "sugars": {
      "Glucose": 1.24,
      "Fructose": 2.1,
      "Sucrose": {
        "label": ">0.02",
        "num": 0.02
      },
      "Maltose": {
        "label": ">0.02",
        "num": 0.02
      },
      "Lactose": {
        "label": ">0.02",
        "num": 0.02
      },
      "Total Sugars": 3.4
    },
    "phytohormones": {
      "Indole-3-Butyric Acid (mg IBA/kg)": 28.4,
      "Indole-3-Acetic Acid (mg IAA/kg)": 36.0,
      "Cytokinin (mg Kinetin/kg)": null,
      "Gibberellin (mg GA/kg)": null,
      "Absisic Acid (mg ABA/kg)": null,
      "Ethylene (< of)": null
    },
    "microorganisms": {
      "Bacillus megaterium": {
        "label": "5*10^4",
        "num": 50000.0
      },
      "Bacillus licheniformis": {
        "label": "5.5x10^5",
        "num": 550000.0
      },
      "Bacillus suptilis": {
        "label": "9.3x10^5",
        "num": 930000.0
      },
      "Azotobacter chroococcum": {
        "label": "5x10^5",
        "num": 500000.0
      },
      "Azotobacter vinelandii": {
        "label": "7x10^4",
        "num": 70000.0
      },
      "Derxia sp": {
        "label": "3.5x10^4",
        "num": 35000.0
      }
    },
    "scores": {
      "Nitrogen Metabolism & Protein Synthesis": 8.0,
      "Stress Tolerance & Osmoregulation": 5.0,
      "Root Development & Nutrient Uptake": 5.0,
      "Photosynthesis & Energy Metabolism": 5.0,
      "Growth Regulation & Hormone Precursors": 3.0,
      "Reproductive Development & Quality": 3.0
    }
  },
  "NF Hyd1": {
    "general": {
      "pH at 25oC": {
        "range": "2.8-3.2",
        "mid": 3.0
      },
      "Conductivity at 25oC": {
        "range": "65-85",
        "mid": 75.0
      },
      "Sp. Weight at 20oC": {
        "range": "1.15-1.17",
        "mid": 1.16
      }
    },
    "content": {
      "Free L-Amino Acids (% w/w)": 14.47,
      "Total Amino Acids (% w/w)": 17.71,
      "Extract of seaweed Ascophyllum Nodosum (% w/w)": null,
      "Polysaccharides (% w/w)": null,
      "Nitrogen Total": {
        "range": "2.85-3.25",
        "mid": 3.05
      },
      "Phosphorous Total": null,
      "Potassium (K)": null,
      "Sulfur": null,
      "Silicon": null,
      "Boron": null,
      "Zinc": null
    },
    "aminoacids_free": {
      "Alanine (Ala)": 1.0,
      "Arginine (Arg)": 0.64,
      "Aspartic Acid (Asp)": 1.08,
      "Glutamic Acid (Glu)": 3.55,
      "Glycine (Gly)": 0.69,
      "Histidine (His)": 0.27,
      "Isoleucine (Ile)": 0.52,
      "Leucine (Leu)": 0.84,
      "Lysine (Lys)": 0.46,
      "Methionine (Met)": 0.24,
      "Phenylalanine (Phe)": 1.06,
      "Proline (Pro)": 2.11,
      "Serine (Ser)": 0.68,
      "Threonine (Thr)": 0.5,
      "Tyrosine (Tyr)": 0.43,
      "Valine (Val)": 0.4,
      "Cystine (Cys)": null,
      "Tryptophan (Trp)": null
    },
    "aminoacids_total": {
      "Alanine (Ala)": 1.12,
      "Arginine (Arg)": 0.68,
      "Aspartic Acid (Asp)": 1.2,
      "Glutamic Acid (Glu)": 4.1,
      "Glycine (Gly)": 0.78,
      "Histidine (His)": 0.35,
      "Isoleucine (Ile)": 0.87,
      "Leucine (Leu)": 1.29,
      "Lysine (Lys)": 0.52,
      "Methionine (Met)": 0.37,
      "Phenylalanine (Phe)": 1.17,
      "Proline (Pro)": 2.31,
      "Serine (Ser)": 0.83,
      "Threonine (Thr)": 0.65,
      "Tyrosine (Tyr)": 0.7,
      "Valine (Val)": 0.77,
      "Cystine (Cys)": null,
      "Tryptophan (Trp)": null
    },
    "osmolytes": {
      "Betaine": null,
      "Mannitol": null
    },
    "sugars": {
      "Glucose": 0.2,
      "Fructose": 0.14,
      "Sucrose": 0.03,
      "Maltose": 0.08,
      "Lactose": {
        "label": "<0.02",
        "num": 0.02
      },
      "Total Sugars": 0.45
    },
    "phytohormones": {
      "Indole-3-Butyric Acid (mg IBA/kg)": 22.0,
      "Indole-3-Acetic Acid (mg IAA/kg)": null,
      "Cytokinin (mg Kinetin/kg)": 116.0,
      "Gibberellin (mg GA/kg)": 1.29,
      "Absisic Acid (mg ABA/kg)": 0.015,
      "Ethylene (< of)": 1.0
    },
    "microorganisms": {
      "Bacillus megaterium": null,
      "Bacillus licheniformis": null,
      "Bacillus suptilis": null,
      "Azotobacter chroococcum": null,
      "Azotobacter vinelandii": null,
      "Derxia sp": null
    },
    "scores": {
      "Nitrogen Metabolism & Protein Synthesis": 9.5,
      "Stress Tolerance & Osmoregulation": 6.5,
      "Root Development & Nutrient Uptake": 2.5,
      "Photosynthesis & Energy Metabolism": 5.0,
      "Growth Regulation & Hormone Precursors": 5.5,
      "Reproductive Development & Quality": 5.0
    }
  },
  "BMC Fixer": {
    "general": {
      "pH at 25oC": {
        "range": "2.8-3.2",
        "mid": 3.0
      },
      "Conductivity at 25oC": {
        "range": "70-90",
        "mid": 80.0
      },
      "Sp. Weight at 20oC": {
        "range": "1.15-1.17",
        "mid": 1.16
      }
    },
    "content": {
      "Free L-Amino Acids (% w/w)": 14.47,
      "Total Amino Acids (% w/w)": 17.71,
      "Extract of seaweed Ascophyllum Nodosum (% w/w)": null,
      "Polysaccharides (% w/w)": null,
      "Nitrogen Total": {
        "range": "2.85-3.25",
        "mid": 3.05
      },
      "Phosphorous Total": null,
      "Potassium (K)": null,
      "Sulfur": null,
      "Silicon": null,
      "Boron": null,
      "Zinc": null
    },
    "aminoacids_free": {
      "Alanine (Ala)": 1.1,
      "Arginine (Arg)": 0.54,
      "Aspartic Acid (Asp)": 1.08,
      "Glutamic Acid (Glu)": 3.55,
      "Glycine (Gly)": 0.69,
      "Histidine (His)": 0.27,
      "Isoleucine (Ile)": 0.52,
      "Leucine (Leu)": 1.63,
      "Lysine (Lys)": 0.42,
      "Methionine (Met)": 0.24,
      "Phenylalanine (Phe)": 1.06,
      "Proline (Pro)": 1.32,
      "Serine (Ser)": 0.68,
      "Threonine (Thr)": 0.5,
      "Tyrosine (Tyr)": 0.43,
      "Valine (Val)": 0.44,
      "Cystine (Cys)": null,
      "Tryptophan (Trp)": null
    },
    "aminoacids_total": {
      "Alanine (Ala)": 1.12,
      "Arginine (Arg)": 0.68,
      "Aspartic Acid (Asp)": 1.2,
      "Glutamic Acid (Glu)": 4.1,
      "Glycine (Gly)": 0.78,
      "Histidine (His)": 0.35,
      "Isoleucine (Ile)": 0.87,
      "Leucine (Leu)": 1.91,
      "Lysine (Lys)": 0.52,
      "Methionine (Met)": 0.37,
      "Phenylalanine (Phe)": 1.09,
      "Proline (Pro)": 1.69,
      "Serine (Ser)": 0.83,
      "Threonine (Thr)": 0.65,
      "Tyrosine (Tyr)": 0.78,
      "Valine (Val)": 0.77,
      "Cystine (Cys)": null,
      "Tryptophan (Trp)": null
    },
    "osmolytes": {
      "Betaine": 0.18,
      "Mannitol": 0.25
    },
    "sugars": {
      "Glucose": 0.2,
      "Fructose": 0.14,
      "Sucrose": 0.03,
      "Maltose": 0.08,
      "Lactose": {
        "label": "<0.02",
        "num": 0.02
      },
      "Total Sugars": 2.25
    },
    "phytohormones": {
      "Indole-3-Butyric Acid (mg IBA/kg)": null,
      "Indole-3-Acetic Acid (mg IAA/kg)": null,
      "Cytokinin (mg Kinetin/kg)": null,
      "Gibberellin (mg GA/kg)": null,
      "Absisic Acid (mg ABA/kg)": null,
      "Ethylene (< of)": null
    },
    "microorganisms": {
      "Bacillus megaterium": null,
      "Bacillus licheniformis": null,
      "Bacillus suptilis": null,
      "Azotobacter chroococcum": null,
      "Azotobacter vinelandii": null,
      "Derxia sp": null
    },
    "scores": {
      "Nitrogen Metabolism & Protein Synthesis": 10.0,
      "Stress Tolerance & Osmoregulation": 6.5,
      "Root Development & Nutrient Uptake": 4.0,
      "Photosynthesis & Energy Metabolism": 5.0,
      "Growth Regulation & Hormone Precursors": 5.5,
      "Reproductive Development & Quality": 5.0
    }
  },
  "Amino Cell S": {
    "general": {
      "pH at 25oC": {
        "range": "2.3-2.7",
        "mid": 2.5
      },
      "Conductivity at 25oC": {
        "range": "30-50",
        "mid": 40.0
      },
      "Sp. Weight at 20oC": {
        "range": "1.21-1.24",
        "mid": 1.225
      }
    },
    "content": {
      "Free L-Amino Acids (% w/w)": 16.78,
      "Total Amino Acids (% w/w)": 19.46,
      "Extract of seaweed Ascophyllum Nodosum (% w/w)": null,
      "Polysaccharides (% w/w)": null,
      "Nitrogen Total": {
        "range": "2.8-3.2",
        "mid": 3.0
      },
      "Phosphorous Total": null,
      "Potassium (K)": null,
      "Sulfur": {
        "range": "15.9-16.1",
        "mid": 16.0
      },
      "Silicon": null,
      "Boron": null,
      "Zinc": null
    },
    "aminoacids_free": {
      "Alanine (Ala)": 1.11,
      "Arginine (Arg)": 0.51,
      "Aspartic Acid (Asp)": 1.77,
      "Glutamic Acid (Glu)": 3.75,
      "Glycine (Gly)": 0.52,
      "Histidine (His)": 0.32,
      "Isoleucine (Ile)": 0.42,
      "Leucine (Leu)": 1.85,
      "Lysine (Lys)": 0.3,
      "Methionine (Met)": 0.24,
      "Phenylalanine (Phe)": 0.93,
      "Proline (Pro)": 1.53,
      "Serine (Ser)": 1.32,
      "Threonine (Thr)": 0.6,
      "Tyrosine (Tyr)": 0.88,
      "Valine (Val)": 0.53,
      "Cystine (Cys)": 0.17,
      "Tryptophan (Trp)": 0.03
    },
    "aminoacids_total": {
      "Alanine (Ala)": 1.32,
      "Arginine (Arg)": 0.62,
      "Aspartic Acid (Asp)": 1.92,
      "Glutamic Acid (Glu)": 3.9,
      "Glycine (Gly)": 0.55,
      "Histidine (His)": 0.33,
      "Isoleucine (Ile)": 0.54,
      "Leucine (Leu)": 1.96,
      "Lysine (Lys)": 0.42,
      "Methionine (Met)": 0.44,
      "Phenylalanine (Phe)": 1.15,
      "Proline (Pro)": 1.59,
      "Serine (Ser)": 1.36,
      "Threonine (Thr)": 0.76,
      "Tyrosine (Tyr)": 1.32,
      "Valine (Val)": 1.02,
      "Cystine (Cys)": 0.23,
      "Tryptophan (Trp)": 0.03
    },
    "osmolytes": {
      "Betaine": 0.22,
      "Mannitol": 0.19
    },
    "sugars": {
      "Glucose": 0.6,
      "Fructose": 0.82,
      "Sucrose": 0.04,
      "Maltose": 0.11,
      "Lactose": {
        "label": "<0.02",
        "num": 0.02
      },
      "Total Sugars": 1.57
    },
    "phytohormones": {
      "Indole-3-Butyric Acid (mg IBA/kg)": 36.5,
      "Indole-3-Acetic Acid (mg IAA/kg)": 44.0,
      "Cytokinin (mg Kinetin/kg)": 80.0,
      "Gibberellin (mg GA/kg)": 0.88,
      "Absisic Acid (mg ABA/kg)": 0.007,
      "Ethylene (< of)": null
    },
    "microorganisms": {
      "Bacillus megaterium": null,
      "Bacillus licheniformis": null,
      "Bacillus suptilis": null,
      "Azotobacter chroococcum": null,
      "Azotobacter vinelandii": null,
      "Derxia sp": null
    },
    "scores": {
      "Nitrogen Metabolism & Protein Synthesis": 10.0,
      "Stress Tolerance & Osmoregulation": 6.0,
      "Root Development & Nutrient Uptake": 4.0,
      "Photosynthesis & Energy Metabolism": 7.0,
      "Growth Regulation & Hormone Precursors": 7.0,
      "Reproductive Development & Quality": 6.5
    }
  },
  "Amino Cell PK": {
    "general": {
      "pH at 25oC": {
        "range": "2.5-2.9",
        "mid": 2.7
      },
      "Conductivity at 25oC": {
        "range": "25-45",
        "mid": 35.0
      },
      "Sp. Weight at 20oC": {
        "range": "1.27-1.29",
        "mid": 1.28
      }
    },
    "content": {
      "Free L-Amino Acids (% w/w)": 7.999,
      "Total Amino Acids (% w/w)": 16.52,
      "Extract of seaweed Ascophyllum Nodosum (% w/w)": null,
      "Polysaccharides (% w/w)": null,
      "Nitrogen Total": {
        "range": "2.8-3.2",
        "mid": 3.0
      },
      "Phosphorous Total": {
        "range": "23.8-24.8",
        "mid": 24.3
      },
      "Potassium (K)": {
        "range": "9.8-10.2",
        "mid": 10.0
      },
      "Sulfur": null,
      "Silicon": null,
      "Boron": null,
      "Zinc": null
    },
    "aminoacids_free": {
      "Alanine (Ala)": 0.95,
      "Arginine (Arg)": 0.23,
      "Aspartic Acid (Asp)": 0.75,
      "Glutamic Acid (Glu)": 1.36,
      "Glycine (Gly)": 0.52,
      "Histidine (His)": 0.05,
      "Isoleucine (Ile)": 0.19,
      "Leucine (Leu)": 1.54,
      "Lysine (Lys)": 0.16,
      "Methionine (Met)": 0.05,
      "Phenylalanine (Phe)": 0.66,
      "Proline (Pro)": 0.71,
      "Serine (Ser)": 0.17,
      "Threonine (Thr)": 0.23,
      "Tyrosine (Tyr)": 0.18,
      "Valine (Val)": 0.21,
      "Cystine (Cys)": 0.03,
      "Tryptophan (Trp)": 0.03
    },
    "aminoacids_total": {
      "Alanine (Ala)": 1.09,
      "Arginine (Arg)": 0.43,
      "Aspartic Acid (Asp)": 0.99,
      "Glutamic Acid (Glu)": 3.58,
      "Glycine (Gly)": 0.61,
      "Histidine (His)": 0.25,
      "Isoleucine (Ile)": 0.71,
      "Leucine (Leu)": 2.48,
      "Lysine (Lys)": 0.35,
      "Methionine (Met)": 0.41,
      "Phenylalanine (Phe)": 1.01,
      "Proline (Pro)": 1.78,
      "Serine (Ser)": 0.58,
      "Threonine (Thr)": 0.49,
      "Tyrosine (Tyr)": 0.76,
      "Valine (Val)": 0.93,
      "Cystine (Cys)": 0.06,
      "Tryptophan (Trp)": 0.03
    },
    "osmolytes": {
      "Betaine": 0.16,
      "Mannitol": 0.12
    },
    "sugars": {
      "Glucose": 0.16,
      "Fructose": 0.12,
      "Sucrose": 0.02,
      "Maltose": 0.05,
      "Lactose": {
        "label": "<0.02",
        "num": 0.02
      },
      "Total Sugars": 0.35
    },
    "phytohormones": {
      "Indole-3-Butyric Acid (mg IBA/kg)": 28.8,
      "Indole-3-Acetic Acid (mg IAA/kg)": 37.0,
      "Cytokinin (mg Kinetin/kg)": 52.2,
      "Gibberellin (mg GA/kg)": 0.59,
      "Absisic Acid (mg ABA/kg)": 0.008,
      "Ethylene (< of)": null
    },
    "microorganisms": {
      "Bacillus megaterium": null,
      "Bacillus licheniformis": null,
      "Bacillus suptilis": null,
      "Azotobacter chroococcum": null,
      "Azotobacter vinelandii": null,
      "Derxia sp": null
    },
    "scores": {
      "Nitrogen Metabolism & Protein Synthesis": 6.0,
      "Stress Tolerance & Osmoregulation": 3.0,
      "Root Development & Nutrient Uptake": 4.0,
      "Photosynthesis & Energy Metabolism": 4.0,
      "Growth Regulation & Hormone Precursors": 7.5,
      "Reproductive Development & Quality": 6.5
    }
  },
  "Amino Cell Si 3%": {
    "general": {
      "pH at 25oC": {
        "range": "2.6-3",
        "mid": 2.8
      },
      "Conductivity at 25oC": {
        "range": "60-80",
        "mid": 70.0
      },
      "Sp. Weight at 20oC": {
        "range": "1.18-1.2",
        "mid": 1.19
      }
    },
    "content": {
      "Free L-Amino Acids (% w/w)": 12.52,
      "Total Amino Acids (% w/w)": 17.79,
      "Extract of seaweed Ascophyllum Nodosum (% w/w)": null,
      "Polysaccharides (% w/w)": null,
      "Nitrogen Total": {
        "range": "2.8-3.2",
        "mid": 3.0
      },
      "Phosphorous Total": null,
      "Potassium (K)": null,
      "Sulfur": null,
      "Silicon": {
        "range": "2.9-3.1",
        "mid": 3.0
      },
      "Boron": null,
      "Zinc": null
    },
    "aminoacids_free": {
      "Alanine (Ala)": 1.1,
      "Arginine (Arg)": 0.37,
      "Aspartic Acid (Asp)": 1.14,
      "Glutamic Acid (Glu)": 2.71,
      "Glycine (Gly)": 0.23,
      "Histidine (His)": 0.27,
      "Isoleucine (Ile)": 0.33,
      "Leucine (Leu)": 1.57,
      "Lysine (Lys)": 0.31,
      "Methionine (Met)": 0.47,
      "Phenylalanine (Phe)": 0.79,
      "Proline (Pro)": 1.08,
      "Serine (Ser)": 0.72,
      "Threonine (Thr)": 0.42,
      "Tyrosine (Tyr)": 0.45,
      "Valine (Val)": 0.49,
      "Cystine (Cys)": 0.04,
      "Tryptophan (Trp)": 0.03
    },
    "aminoacids_total": {
      "Alanine (Ala)": 1.3,
      "Arginine (Arg)": 0.65,
      "Aspartic Acid (Asp)": 1.38,
      "Glutamic Acid (Glu)": 4.57,
      "Glycine (Gly)": 0.31,
      "Histidine (His)": 0.45,
      "Isoleucine (Ile)": 0.39,
      "Leucine (Leu)": 1.83,
      "Lysine (Lys)": 0.35,
      "Methionine (Met)": 0.53,
      "Phenylalanine (Phe)": 1.25,
      "Proline (Pro)": 1.77,
      "Serine (Ser)": 1.1,
      "Threonine (Thr)": 0.57,
      "Tyrosine (Tyr)": 0.67,
      "Valine (Val)": 0.58,
      "Cystine (Cys)": 0.06,
      "Tryptophan (Trp)": 0.03
    },
    "osmolytes": {
      "Betaine": 0.18,
      "Mannitol": 0.26
    },
    "sugars": {
      "Glucose": 0.16,
      "Fructose": 0.12,
      "Sucrose": 0.02,
      "Maltose": 0.05,
      "Lactose": {
        "label": "<0.02",
        "num": 0.02
      },
      "Total Sugars": 0.35
    },
    "phytohormones": {
      "Indole-3-Butyric Acid (mg IBA/kg)": 22.6,
      "Indole-3-Acetic Acid (mg IAA/kg)": 36.9,
      "Cytokinin (mg Kinetin/kg)": 112.6,
      "Gibberellin (mg GA/kg)": 1.23,
      "Absisic Acid (mg ABA/kg)": 0.013,
      "Ethylene (< of)": null
    },
    "microorganisms": {
      "Bacillus megaterium": null,
      "Bacillus licheniformis": null,
      "Bacillus suptilis": null,
      "Azotobacter chroococcum": null,
      "Azotobacter vinelandii": null,
      "Derxia sp": null
    },
    "scores": {
      "Nitrogen Metabolism & Protein Synthesis": 8.5,
      "Stress Tolerance & Osmoregulation": 6.5,
      "Root Development & Nutrient Uptake": 3.0,
      "Photosynthesis & Energy Metabolism": 4.5,
      "Growth Regulation & Hormone Precursors": 5.0,
      "Reproductive Development & Quality": 4.5
    }
  }
};
