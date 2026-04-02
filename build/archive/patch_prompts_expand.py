import re

with open('build/_source.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()

result = []
i = 0

while i < len(lines):
    line = lines[i]

    # --- TAREFA 1: Remover bloco de prompts seção 08 ---
    if '<!-- ══ 04 PROMPTS DE VÍDEO ══ -->' in line:
        # Contar divs até fechar o bloco externo
        depth = 0
        i += 1
        while i < len(lines):
            l = lines[i]
            opens = l.count('<div') - l.count('</div')
            # contar só abertura de tags (não self-closing)
            opens = len(re.findall(r'<div[\s>]', l)) - len(re.findall(r'</div>', l))
            depth += opens
            i += 1
            if depth <= 0 and '</div>' in l:
                break
        # Pular linha em branco após o bloco (se houver)
        if i < len(lines) and lines[i].strip() == '':
            i += 1
        continue

    # --- TAREFA 2: Remover botões expand-btn e ativar container ---
    if 'class="expand-btn"' in line:
        # Modificar a linha anterior (container aspect-ratio)
        if result:
            prev = result[-1]
            if 'aspect-ratio:' in prev and 'position:relative' in prev:
                # Adicionar cursor:pointer e onclick ao container
                prev = prev.replace(
                    'flex-direction:column;">',
                    'flex-direction:column;cursor:pointer;" onclick="expandMock(this)">'
                )
                result[-1] = prev
        i += 1
        continue

    # --- TAREFA 3: Limpar sec-desc dos prompts seção 06 ---
    if 'Cada grupo compartilha um prompt de geração' in line:
        line = re.sub(
            r' Cada grupo compartilha um prompt de geração[^<]*',
            '',
            line
        )

    # --- TAREFA 4: Remover divs ocultos de prompt (pr-gXX) ---
    if re.search(r'<div id="pr-g[^"]*" style="display:none;">', line):
        i += 1
        continue

    # --- TAREFA 5: Remover botões "Copiar prompt" da seção 06 ---
    if 'Copiar prompt</button>' in line and 'copy-btn' in line:
        i += 1
        continue

    # --- TAREFA 6: Simplificar container do header de grupo (flex desnecessário) ---
    if 'align-items:flex-start;justify-content:space-between;gap:16px;' in line:
        line = line.replace(
            'display:flex;align-items:flex-start;justify-content:space-between;gap:16px;',
            ''
        )

    result.append(line)
    i += 1

with open('build/_source.html', 'w', encoding='utf-8') as f:
    f.writelines(result)

print(f'Concluido. {len(result)} linhas escritas.')
