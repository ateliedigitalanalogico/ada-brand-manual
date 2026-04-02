import re

# ── helpers ───────────────────────────────────────────────────────────────────
def alfa(fill):
    return (f'<svg width="32" height="32" viewBox="225 225 126 126" xmlns="http://www.w3.org/2000/svg">'
            f'<polygon fill="{fill}" points="268.01 297 288 257.02 307.99 297 324 297 288 225 252 297 268.01 297"/>'
            f'<polygon fill="{fill}" points="238.5 324 225 351 241.01 351 250.01 333 254.51 324 238.5 324"/>'
            f'<polygon fill="{fill}" points="321.49 324 325.99 333 334.99 351 351 351 337.5 324 321.49 324"/>'
            f'</svg>')

def esc(s):
    return (s.replace('&','&amp;').replace('<','&lt;').replace('>','&gt;')
             .replace('"','&quot;').replace('·','&middot;').replace('ã','&atilde;'))

def sig_table(bg, alfa_fill, c_name, c_role, c_contact, c_footer, border_sep, border_div):
    return f'''<table cellpadding="0" cellspacing="0" border="0" style="font-family:'Helvetica Neue',Arial,sans-serif;background:{bg};padding:20px;">
          <tr>
            <td style="padding-right:16px;vertical-align:middle;">{alfa(alfa_fill)}</td>
            <td style="border-left:1px solid {border_div};padding-left:16px;vertical-align:middle;">
              <div style="font-size:14px;font-weight:600;color:{c_name};letter-spacing:0.02em;margin-bottom:2px;"><span class="s-name">Caio Fazolin</span></div>
              <div style="font-size:11px;color:{c_role};letter-spacing:0.04em;text-transform:uppercase;margin-bottom:6px;"><span class="s-role">Diretor Criativo · ADA</span></div>
              <div style="font-size:11px;color:{c_contact};margin-bottom:2px;"><span class="s-email">caio@ada.art.br</span></div>
              <div style="font-size:11px;color:{c_contact};margin-bottom:8px;"><span class="s-phone">+55 11 98434-0084</span></div>
              <div style="font-size:10px;color:{c_footer};letter-spacing:0.06em;text-transform:uppercase;border-top:1px solid {border_sep};padding-top:6px;">ada.art.br · São Paulo · Brasil</div>
            </td>
          </tr>
        </table>'''

def sig_table_esc(bg, alfa_fill, c_name, c_role, c_contact, c_footer, border_sep, border_div):
    """Versão HTML escaped para o hidden div (com dados default)."""
    a = esc(alfa(alfa_fill))
    return (f'&lt;table cellpadding=&quot;0&quot; cellspacing=&quot;0&quot; border=&quot;0&quot; '
            f'style=&quot;font-family:&apos;Helvetica Neue&apos;,Arial,sans-serif;background:{bg};padding:20px;&quot;&gt;'
            f'&lt;tr&gt;'
            f'&lt;td style=&quot;padding-right:16px;vertical-align:middle;&quot;&gt;{a}&lt;/td&gt;'
            f'&lt;td style=&quot;border-left:1px solid {border_div};padding-left:16px;vertical-align:middle;&quot;&gt;'
            f'&lt;div style=&quot;font-size:14px;font-weight:600;color:{c_name};letter-spacing:0.02em;margin-bottom:2px;&quot;&gt;Caio Fazolin&lt;/div&gt;'
            f'&lt;div style=&quot;font-size:11px;color:{c_role};letter-spacing:0.04em;text-transform:uppercase;margin-bottom:6px;&quot;&gt;Diretor Criativo &amp;middot; ADA&lt;/div&gt;'
            f'&lt;div style=&quot;font-size:11px;color:{c_contact};margin-bottom:2px;&quot;&gt;caio@ada.art.br&lt;/div&gt;'
            f'&lt;div style=&quot;font-size:11px;color:{c_contact};margin-bottom:8px;&quot;&gt;+55 11 98434-0084&lt;/div&gt;'
            f'&lt;div style=&quot;font-size:10px;color:{c_footer};letter-spacing:0.06em;text-transform:uppercase;border-top:1px solid {border_sep};padding-top:6px;&quot;&gt;ada.art.br &amp;middot; S&amp;atilde;o Paulo &amp;middot; Brasil&lt;/div&gt;'
            f'&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;')

def variant(slug, label, bg_wrap, **kw):
    table     = sig_table(**kw)
    table_esc = sig_table_esc(**kw)
    buttons = (f'<div style="display:flex;gap:8px;margin-top:10px;">'
               f'<button class="copy-btn" onclick="dlMock(\'sig-{slug}\',\'ada-assinatura-{slug}\',520)">&#8595; PNG</button>'
               f'<button class="copy-btn" onclick="openSigHTML(\'sig-{slug}-html\')">&#8644; Abrir</button>'
               f'<button class="copy-btn" onclick="cp(\'sig-{slug}-html\',this)">&#8854; HTML</button>'
               f'</div>')
    return (f'    <div>\n'
            f'      <div class="sig-mode-label">{label}</div>\n'
            f'      <div id="sig-{slug}" style="background:{bg_wrap};display:inline-block;">\n'
            f'        {table}\n'
            f'      </div>\n'
            f'      {buttons}\n'
            f'      <div id="sig-{slug}-html" style="display:none;">{table_esc}</div>\n'
            f'    </div>')


# ── 4 modos canônicos ────────────────────────────────────────────────────────
#   Padrão · Invertido · Meia-noite · Monocromático
VARIANTS = [
    variant('padrao', 'Padrão',
            bg_wrap='#000000',
            bg='#000000', alfa_fill='#FFD600',
            c_name='#FFD600', c_role='rgba(255,214,0,0.55)',
            c_contact='rgba(255,255,255,0.4)', c_footer='rgba(255,255,255,0.2)',
            border_sep='rgba(255,214,0,0.1)', border_div='rgba(255,214,0,0.2)'),
    variant('invertido', 'Invertido',
            bg_wrap='#FFD600',
            bg='#FFD600', alfa_fill='#000000',
            c_name='#000000', c_role='rgba(0,0,0,0.6)',
            c_contact='rgba(0,0,0,0.45)', c_footer='rgba(0,0,0,0.3)',
            border_sep='rgba(0,0,0,0.1)', border_div='rgba(0,0,0,0.15)'),
    variant('midnight', 'Meia-noite',
            bg_wrap='#0A0F1E',
            bg='#0A0F1E', alfa_fill='#4A7FD4',
            c_name='#4A7FD4', c_role='rgba(74,127,212,0.7)',
            c_contact='rgba(255,255,255,0.35)', c_footer='rgba(74,127,212,0.35)',
            border_sep='rgba(74,127,212,0.15)', border_div='rgba(74,127,212,0.25)'),
    variant('mono', 'Monocromático',
            bg_wrap='#ffffff',
            bg='#ffffff', alfa_fill='#000000',
            c_name='#111111', c_role='rgba(0,0,0,0.55)',
            c_contact='rgba(0,0,0,0.4)', c_footer='rgba(0,0,0,0.25)',
            border_sep='rgba(0,0,0,0.1)', border_div='rgba(0,0,0,0.12)'),
]

FORM = '''    <!-- Formulário -->
    <div style="background:var(--bg2);border:1px solid var(--border-dim);padding:20px 24px;margin-bottom:20px;">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px 20px;margin-bottom:14px;">
        <div>
          <div class="sig-form-label">Nome</div>
          <input id="f-name" class="sig-input" value="Caio Fazolin" oninput="updateSigs()" placeholder="Nome">
        </div>
        <div>
          <div class="sig-form-label">Cargo</div>
          <input id="f-role" class="sig-input" value="Diretor Criativo · ADA" oninput="updateSigs()" placeholder="Cargo">
        </div>
        <div>
          <div class="sig-form-label">E-mail</div>
          <input id="f-email" class="sig-input" value="caio@ada.art.br" oninput="updateSigs()" placeholder="email@ada.art.br" type="email">
        </div>
        <div>
          <div class="sig-form-label">Telefone</div>
          <input id="f-phone" class="sig-input" value="+55 11 98434-0084" oninput="updateSigs()" placeholder="+55 11 9XXXX-XXXX">
        </div>
      </div>
    </div>'''

NEW_BLOCK = f'''<!-- ══ ASSINATURA DE E-MAIL ══ -->
<div class="blk">
  <div class="blk-inner">
    <span class="sec-label">Assinatura de e-mail</span>
    <div class="sec-desc" style="margin-bottom:20px;">Preencha os dados e as 4 variantes atualizam em tempo real. Para usar no Gmail: clique <strong>&#8644; Abrir</strong> → abre no navegador → Ctrl+A → Ctrl+C → cole na configuração de assinatura do Gmail.</div>

{FORM}

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px 32px;">
{chr(10).join(VARIANTS)}
    </div>

  </div>
</div>'''

# ── aplicar ──────────────────────────────────────────────────────────────────
with open('build/_source.html', 'r', encoding='utf-8') as f:
    content = f.read()

start = content.find('<!-- ══ ASSINATURA DE E-MAIL ══ -->')
end   = content.find('<!-- ══ SPECS ══ -->')
assert start > 0 and end > start

content = content[:start] + NEW_BLOCK + '\n\n' + content[end:]

with open('build/_source.html', 'w', encoding='utf-8') as f:
    f.write(content)

print('OK')
