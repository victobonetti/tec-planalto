"""Gera lei.json (texto vigente, artigo por artigo) para a extensão.

Uso: python3 gerar-lei.py CF.txt CE.txt ../lei.json
  CF.txt: texto da Constituição Federal (planalto.gov.br/ccivil_03/constituicao/constituicao.htm),
          sem o texto revogado (tachado), uma linha por dispositivo.
  CE.txt: texto da Constituição de Santa Catarina (ALESC), no mesmo formato.
O ADCT não entra: as referências "do ADCT" não viram link.
"""
import json, re, sys

NOTA = re.compile(r"\s*\((?:NR|Redação|Incluíd|Incluid|Vide|Regulamento|Reda|Revogad|Promulga)[^)]*\)\s*\.?", re.I)
CAB = re.compile(r"^(TÍTULO|CAPÍTULO|Seção|Subseção|SEÇÃO|DA |DO |DAS |DOS |ADI |EC/|\(|\.|;|\)$)")
ROT = re.compile(r"^(§ \d+[º°]?\.?|Parágrafo único\.|[IVXLC]+(?:-[A-Z])?\s*[-–]|[a-z]\))\s*")

def limpa(t):
    t = NOTA.sub(" ", t)
    t = re.sub(r"^([IVXLC]+)\s+(?=[a-zà-ú])", r"\1 - ", t)      # "IV as ilhas" (sem hífen no original)
    t = re.sub(r"^§ (\d+) o ", r"§ \1º ", t)                  # "§ 1 o" (ordinal quebrado)
    t = re.sub(r"^(Art\. \d+(?:-[A-Z])?)\s+(?=[A-ZÀ-Ú])", r"\1. ", t)  # "Art. 42 Os" (sem ponto)
    return re.sub(r"\s+", " ", t).strip()

def artigos(linhas):
    out, atual, n = {}, None, None
    for x in linhas:
        x = x.strip()
        if not x: continue
        m = re.match(r"^Art\. (\d+(?:-[A-Z])?)(?:º|\.)?\.?\s", x)
        if m:
            n = m.group(1)
            if n in out:  # segunda numeração (ADCT): para aqui
                break
            atual = out.setdefault(n, [])
        if atual is None: continue
        if atual and (CAB.match(x) or x.isupper()): continue
        x = limpa(x)
        if atual and len(ROT.sub("", x)) < 3: continue  # resto vazio de texto revogado
        atual.append(x)
    return out

if __name__ == "__main__":
    cf = artigos(open(sys.argv[1], encoding="utf-8").read().split("\n"))
    ce = artigos(open(sys.argv[2], encoding="utf-8").read().split("\n"))
    json.dump({"cf": cf, "ce": ce}, open(sys.argv[3], "w", encoding="utf-8"), ensure_ascii=False, separators=(",", ":"))
    print("CF:", len(cf), "artigos | CE/SC:", len(ce), "artigos")
