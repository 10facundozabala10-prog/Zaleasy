import re

file = r'd:\Google antigravity\GestiondeventasdiariasSAAS\app.html'

with open(file, 'r', encoding='utf-8') as f:
    content = f.read()

# Normalize to \n for matching
normalized = content.replace('\r\n', '\n').replace('\r', '\n')

old = '''                            <div class="form-group">
                                <label for="product">Producto / Descripci\u00f3n</label>
                                <div class="input-wrapper">
                                    <i class="fa-solid fa-tag"></i>
                                    <input type="text" id="product" placeholder="Ej: Suscripci\u00f3n mensual" required>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="amount">Monto (ARS)</label>
                                <div class="input-wrapper">
                                    <i class="fa-solid fa-dollar-sign"></i>
                                    <input type="number" id="amount" step="0.01" min="0" placeholder="5000" value="5000"
                                        required>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="category">Categor\u00eda <span
                                        style="color:var(--text-muted);font-weight:400;">(opcional)</span></label>
                                <div class="input-wrapper">
                                    <i class="fa-solid fa-folder-open"></i>
                                    <select id="category">
                                        <option value="">Sin categor\u00eda</option>
                                        <option value="Producto">\U0001f4e6 Producto</option>
                                        <option value="Servicio">\u2699\ufe0f Servicio</option>
                                        <option value="Suscripci\u00f3n">\U0001f504 Suscripci\u00f3n</option>
                                        <option value="Consultor\u00eda">\U0001f4bc Consultor\u00eda</option>
                                        <option value="Alquiler">\U0001f3e0 Alquiler</option>
                                        <option value="Marketing">\U0001f4e3 Marketing</option>
                                        <option value="Insumos">\U0001f6d2 Insumos</option>
                                        <option value="Otros">\U0001f516 Otros</option>
                                    </select>
                                </div>
                            </div>'''

new = '''                            <!-- Multi-Item List -->
                            <div class="form-group">
                                <label style="display:flex; justify-content:space-between; align-items:center; margin-bottom:.6rem;">
                                    <span>Productos / \u00cdtems</span>
                                    <button type="button" id="btn-add-item" class="btn-add-item">
                                        <i class="fa-solid fa-circle-plus"></i> Agregar \u00edtem
                                    </button>
                                </label>
                                <div id="items-container" class="items-container">
                                    <!-- Item rows injected by JS -->
                                </div>
                                <div id="multi-item-total" class="multi-item-total" style="display:none;">
                                    <span>\U0001f4cb Total de la transacci\u00f3n</span>
                                    <strong id="multi-item-total-value">$0.00</strong>
                                </div>
                            </div>'''

if old in normalized:
    result = normalized.replace(old, new, 1)
    # Restore \r\n line endings
    result = result.replace('\n', '\r\n')
    with open(file, 'w', encoding='utf-8') as f:
        f.write(result)
    print('SUCCESS: Replacement done')
else:
    print('ERROR: Old block not found')
    if 'id="product"' in normalized:
        print('product input IS in file')
    else:
        print('product input NOT in file')
