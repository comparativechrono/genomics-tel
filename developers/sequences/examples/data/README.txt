Data for the sequences and alignments examples (developers/sequences/examples/).

hbb-beta-globins.fasta
  Eight reviewed UniProtKB/Swiss-Prot beta-globin sequences from UniProt release 2026_03 (2 September 2026),
  downloaded on 15 October 2026 from
  https://rest.uniprot.org/uniprotkb/accessions?accessions=P68871,P68873,P02088,P02091,P02062,P60524,P02070,P02112&format=fasta
  P68871 HBB_HUMAN (human), P68873 HBB_PANTR (chimpanzee), P02088 HBB1_MOUSE (mouse, beta-1 chain),
  P02091 HBB1_RAT (rat, beta-1 chain), P02062 HBB_HORSE (horse), P60524 HBB_CANLF (dog),
  P02070 HBB_BOVIN (cow), P02112 HBB_CHICK (chicken).
  UniProt data are under the Creative Commons Attribution 4.0 licence (CC BY 4.0): https://www.uniprot.org/help/license

hbb-beta-globins.aln.fasta
  The same eight sequences aligned with FAMSA through pyfamsa 0.7.0 (Python), with a UPGMA guide tree and
  default settings, written in the input order under the UniProt entry names:
    pyfamsa.Aligner(guide_tree="upgma").align(sequences)
  147 columns. The only gaps are at the start of the horse, dog and cow rows. Re-running the alignment on
  15 October 2026 gave an identical file.

Which example uses which file
  react-msaview.html loads hbb-beta-globins.aln.fasta.
  nightingale-msa.html and svg-alignment.html carry the same alignment inside the page, with common names
  (Human, Chimpanzee ...) in place of the entry names, so that each works as a single downloaded file.
  uniprot-residue.html asks the UniProt REST API directly and uses no file here.
  seqviz-exon.html carries HBB exon 1 inside the page: the reverse complement of GRCh38 chr11:5,226,930-5,227,071,
  from the UCSC Genome Browser API (https://api.genome.ucsc.edu/getData/sequence?genome=hg38;chrom=chr11;start=5226929;end=5227071).
