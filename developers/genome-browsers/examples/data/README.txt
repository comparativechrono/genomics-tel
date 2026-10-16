HBB teaching mini-dataset: GRCh38 chr11:5,217,001-5,237,000, as one contig called HBB_region.
Local position = GRCh38 position - 5,217,000.

Files
- hbb-region.fa, hbb-region.fa.fai: the 20 kb sequence, from UCSC hg38 through api.genome.ucsc.edu, and its samtools faidx index.
- hbb-region.gff3, hbb-region.bed: HBB (NM_000518.5) and HBD (NM_000519.4), NCBI RefSeq Select, through the UCSC API. Exons are numbered along each gene (both genes are on the reverse strand). The BED name field contains a space, so use bedToBigBed -tab.
- hbb-variants.vcf, hbb-variants.vcf.gz, hbb-variants.vcf.gz.tbi: seven ClinVar variants (release clinvar_20261004) at local positions, with genotypes for four made-up people. Compressed with bgzip and indexed with tabix -p vcf.
- hbb-variants.grch38.vcf.gz and .tbi: the same variants and genotypes at their GRCh38 positions on chr11.

The genotypes are synthetic, for teaching only. No real person's data are included.

Terms of use
- UCSC: "The sequence and annotation data displayed in the Genome Browser are freely available for any use", with conditions on some tracks. Please credit the data contributors. https://genome.ucsc.edu/conditions.html
- NCBI RefSeq and ClinVar: NCBI places no restrictions on the use or distribution of its data, although submitters may claim rights in some records. https://www.ncbi.nlm.nih.gov/home/about/policies/
