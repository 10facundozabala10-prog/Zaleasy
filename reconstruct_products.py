import os
import re

def read_file(path):
    if not os.path.exists(path):
        print(f"File not found: {path}")
        return ""
    with open(path, 'r', encoding='utf-8') as f:
        return f.read()

def fix_encoding(text):
    try:
        # Common mojibake fix: interpreted UTF-8 bytes as Windows-1252/Latin-1
        # We try to reverse it: encode to latin-1 (getting the bytes back) then decode as utf-8
        return text.encode('latin-1').decode('utf-8')
    except Exception as e:
        print(f"Encoding fix failed: {e}")
        return text

def reconstruct():
    # List of files in order of preference (later files overwrite earlier ones if duplicate IDs)
    # raw_part1 to 6: Old data (P001-P276)
    # raw_part8 to 10: New provided data (P227-P402) - Overlaps and extends
    # raw_part7_new_om906: New OM906 data (P428-P434)
    
    files = [
        'raw_part1.txt', 'raw_part2.txt', 'raw_part3.txt', 
        'raw_part4.txt', 'raw_part5.txt', 'raw_part6.txt',
        'raw_part8.txt', 'raw_part9.txt', 'raw_part10.txt',
        'raw_part7_new_om906.txt'
    ]
    
    base_dir = r"d:\Google antigravity\Zabala Repuestos web\Zabala repuestos CON CATALOGO"
    all_content = ""
    
    print("Reading files...")
    for fname in files:
        path = os.path.join(base_dir, fname)
        content = read_file(path)
        all_content += "\n" + content

    print("Extracting products...")
    # Regex to extract object with ID.
    # Matches { ... id: "Pxxx", ... }
    # Assumes "id" key comes early or we scan for it.
    # Robust regex: Find '{', then look for 'id: "..."', then find matching closing '}'?
    # Since the format is consistent (user provided), we can rely on `id: "..."` being present.
    # We will split by `},` which is the common delimiter, then clean up.
    
    # Simpler regex approach:
    # Capture everything between `{` and `}` that contains `id:`.
    # Warning: Lazy matching might miss internal braces if any. But product data is simple.
    
    product_pattern = re.compile(r'\{\s*id:\s*"([^"]+)"[\s\S]*?\}')
    
    products_map = {}
    
    for match in product_pattern.finditer(all_content):
        full_match = match.group(0)
        prod_id = match.group(1)
        
        # Check if ID is valid format Pxxx
        if prod_id.startswith("P"):
            products_map[prod_id] = full_match
    
    print(f"Found {len(products_map)} unique products.")
    
    # Sort by ID
    def sort_key(pid):
        # Extract number
        num = pid[1:]
        try:
            return int(num)
        except:
            return 999999
            
    sorted_ids = sorted(products_map.keys(), key=sort_key)
    
    final_products = []
    for pid in sorted_ids:
        final_products.append(products_map[pid])
        
    # Join with commas
    products_js_content = ",\n".join(final_products)
    
    # Wrap in module code
    final_content = f"""const products = [
{products_js_content}
];

if (typeof module !== 'undefined' && module.exports) {{
    module.exports = products;
}}
"""

    print("Fixing encoding...")
    final_content_fixed = fix_encoding(final_content)
    
    output_path = os.path.join(base_dir, 'products.js')
    print(f"Writing to {output_path}...")
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(final_content_fixed)
        
    print("Done.")

if __name__ == "__main__":
    reconstruct()
