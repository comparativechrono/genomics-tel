Data for the network examples on genomics.tel (developers/networks/examples/).

string-p53-ids.json and string-p53-network.json
  Two replies from the STRING API, version 12.5 (https://version-12-5.string-db.org),
  saved on 15 October 2026. string-network.html shows them when STRING cannot be
  reached, or when its address ends in ?offline=1.
  string-p53-ids.json is the reply to
    /api/json/get_string_ids?identifiers=TP53%0DMDM2%0DMDM4%0DATM%0DCHEK2%0DCDKN1A%0DBAX%0DBBC3%0DCDKN2A%0DEP300&limit=1&species=9606&caller_identity=www.genomics.tel
  string-p53-network.json is the reply to
    /api/json/network?identifiers=<the ten STRING IDs from the first reply, separated by %0D>&required_score=700&network_type=functional&species=9606&caller_identity=www.genomics.tel
  Both are unchanged apart from line breaks and indentation added for reading.
  STRING data are free to use under the Creative Commons Attribution 4.0 licence
  (CC BY 4.0). Cite: Szklarczyk D, Nastou K, Koutrouli M, et al. (2025). The STRING
  database in 2025: protein networks with directionality of regulation. Nucleic Acids
  Research 53(D1): D730-D737. doi:10.1093/nar/gkae1113

p53-pathway.cyjs and p53-pathway-style.json
  Written by hand for this site, in the formats that Cytoscape desktop writes with
  File > Export > Network to File > Cytoscape.js JSON (*.cyjs) and
  File > Export > Styles to File > Style for cytoscape.js (*.json).
  They were not exported from Cytoscape itself. The "generated_by" field says so.
  Six proteins of the p53 pathway and seven interactions. The PubMed column gives one
  paper that supports each interaction:
    ATM activates CHEK2       PMID 10973490  Matsuoka et al. (2000) PNAS 97:10389
    ATM activates TP53        PMID 9733514   Banin et al. (1998) Science 281:1674
    CHEK2 activates TP53      PMID 10710310  Hirao et al. (2000) Science 287:1824
    TP53 induces MDM2         PMID 8319905   Wu et al. (1993) Genes Dev 7:1126
    MDM2 inhibits TP53        PMID 9153395   Haupt et al. (1997) Nature 387:296
    TP53 induces CDKN1A       PMID 8242752   el-Deiry et al. (1993) Cell 75:817
    TP53 induces BAX          PMID 7834749   Miyashita and Reed (1995) Cell 80:293
  These two files are covered by the MIT licence in this repository's LICENSE.md,
  like the example files.
