import re

titles = [
    "Health & Care Platform",
    "SAAP",
    "Marketplace Platform",
    "Logistics & Dispatch Platform",
    "Logistics & Dispatch",
    "Creative Community & Media Platform",
    "Creative Community",
    "FinTech Platform",
    "Multiple Payment Gateways & Advertisement Platform",
    "Ads & Payment Platform",
    "Ads & Payment",
    "E-Commerce Platform",
    "CRM Platform"
]

files = [
    "/Users/macbookpro/pitch/app/components/PresentationShell.tsx",
    "/Users/macbookpro/pitch/app/page.tsx",
    "/Users/macbookpro/pitch/app/components/PortfolioGallerySlide.tsx"
]

for fp in files:
    with open(fp, "r") as f:
        content = f.read()
    
    for title in titles:
        # Prevent double replacing if already Ai Based
        if "(Ai Based)" in title: continue
        
        # Replace title="..."
        content = re.sub(rf'title="{title}"', f'title="{title} (Ai Based)"', content)
        # Replace label: "..."
        content = re.sub(rf'label: "{title}"', f'label: "{title} (Ai Based)"', content)
        # Replace title: "..."
        content = re.sub(rf'title: "{title}"', f'title: "{title} (Ai Based)"', content)
        
    with open(fp, "w") as f:
        f.write(content)

print("Files updated with (Ai Based)")
