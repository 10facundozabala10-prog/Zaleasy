
import re
import os

file_path = r"d:\Google antigravity\Zabala Repuestos web\Zabala repuestos CON CATALOGO\products.js"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Pattern to capture individual product objects
# We look for { id: "P...", ... }
# We use a non-greedy match for the content until the closing brace
# This assumes the product objects are well-formed enough to be matched
# and that there are no nested braces within the description (which holds true for this catalog so far)
pattern = re.compile(r'\{\s*id:\s*"P\d+",.+?\}(?=\s*[,;\]])', re.DOTALL)

# Alternative approach: Find the start of "const products = [" and assume everything else is an item?
# No, because the file is broken.
# Let's try to extract all matches of the object structure.

# Let's define the product block pattern more carefully.
# It starts with { and ends with }
# Inside, it has id, name, brand, etc.
matches = []
# We'll just scan the whole file for objects that look like products.
# We know they start with space { newline id: ...
regex = r'\{\s*id:\s*"[^"]+",\s*name:[\s\S]*?\n\s*\}'

found_products = re.findall(regex, content)

print(f"Found {len(found_products)} products.")

# Deduplicate based on ID just in case
unique_products = {}
for prod in found_products:
    # Extract ID
    id_match = re.search(r'id:\s*"([^"]+)"', prod)
    if id_match:
        pid = id_match.group(1)
        unique_products[pid] = prod

# Sort by ID
sorted_ids = sorted(unique_products.keys(), key=lambda x: int(x[1:]))

print(f"Recovered {len(sorted_ids)} unique products.")

new_content = "const products = [\n"
new_content += ",\n".join([unique_products[pid] for pid in sorted_ids])
new_content += "\n];\n\n"
new_content += "if (typeof module !== 'undefined' && module.exports) {\n"
new_content += "    module.exports = products;\n"
new_content += "}\n"

with open(file_path, "w", encoding="utf-8") as f:
    f.write(new_content)

print("Successfully repaired products.js")
