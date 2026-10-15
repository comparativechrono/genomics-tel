Data files for the chart examples. Downloaded from Zenodo on 15 October 2026.
Both are adapted from Galaxy Training Network training data by Maria Doyle, licensed under
Creative Commons Attribution 4.0 (CC BY 4.0, https://creativecommons.org/licenses/by/4.0/).
The underlying experiment is Fu NY et al. (2015) Nature Cell Biology 17: 365-375, GEO GSE60450.

gtn-luminal-pregnant-lactating.tsv (1.1 MB), used by volcano-thresholds.html
  Source: file limma-voom_luminalpregnant-luminallactate in "RNA-seq genes to pathways (training data)",
  Doyle M (2018), Zenodo, https://doi.org/10.5281/zenodo.2596382
  Contents: limma-voom results for 15,804 mouse genes, luminal cells of pregnant against lactating mice.
  Changes: kept the columns SYMBOL, GENENAME, logFC, P.Value and adj.P.Val, and rounded the numbers to
  6 significant figures (2.5 MB down to 1.1 MB). No gene changes group at any cut-off the example offers.

gtn-growth-factor-genes.tsv (8 kB), used by heatmap-makeover.html
  Source: file limma-voom_normalised_counts in "Heatmap2 (training data)",
  Doyle M (2018), Zenodo, https://doi.org/10.5281/zenodo.2529926
  Contents: normalised expression (log2 counts per million) in 12 samples.
  Changes: kept only the 31 rows named in the record's heatmap_genes file. Values are unchanged.
  The sample groups in the example come from the file factordata in record 2596382.
  The example's row order: each gene's values turned into z-scores across the 12 samples, then
  average-linkage clustering on Euclidean distance with optimal leaf ordering (SciPy 1.18.1).
