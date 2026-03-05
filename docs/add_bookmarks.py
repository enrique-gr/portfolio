from pypdf import PdfReader, PdfWriter

# 1. INPUT/OUTPUT FILE NAMES
# Updated to match your uploaded file
input_pdf_name = "Enrique_Garcia_Rivera_Honeybee_Robotics_Portfolio_Sample.pdf"
output_pdf_name = "Enrique_Garcia_Rivera_Honeybee_Robotics_Portfolio_Sample_Bookmarked.pdf"

# 2. PAGE OFFSET SETTING
# In this document, "1. System Architecture" starts on PDF Page 1.
# Therefore, no offset is needed relative to the physical page count.
START_OF_CHAPTER_1_PDF_PAGE = 1

def get_page_index(book_page_num):
    """
    Converts the printed book page number to the 0-based PDF page index.
    Formula: (Start_Index) + (Book_Page - 1)
    """
    start_index = START_OF_CHAPTER_1_PDF_PAGE - 1
    return max(0, start_index + (book_page_num - 1))

# 3. THE BOOKMARK DATA
# Structure updated to match the specific sections in your portfolio sample
bookmarks = [
    {
        "title": "1. System Architecture: Mission Context & System Boundaries",
        "page_index": get_page_index(1),
        "children": []
    },
    {
        "title": "2. Implementation: Power Topology & Fault Isolation",
        "page_index": get_page_index(2),
        "children": []
    },
    {
        "title": "3. Validation: Hardware-in-the-Loop (HIL) Testing",
        "page_index": get_page_index(3),
        "children": []
    },
    {
        "title": "4. Engineering Judgment: Lessons Learned & Next Steps",
        "page_index": get_page_index(4),
        "children": []
    }
]

def add_bookmarks_recursive(writer, bookmarks, parent=None):
    for bm in bookmarks:
        # Add the bookmark
        new_parent = writer.add_outline_item(bm["title"], bm["page_index"], parent=parent)
        
        # If there are children, recurse
        if "children" in bm:
            add_bookmarks_recursive(writer, bm["children"], parent=new_parent)

# 4. PROCESSING
try:
    reader = PdfReader(input_pdf_name)
    writer = PdfWriter()

    # Copy all pages
    for page in reader.pages:
        writer.add_page(page)

    # Add the bookmarks
    add_bookmarks_recursive(writer, bookmarks)

    # Save
    with open(output_pdf_name, "wb") as f_out:
        writer.write(f_out)
    
    print(f"Success! Bookmarks added to: {output_pdf_name}")

except FileNotFoundError:
    print(f"Error: Could not find '{input_pdf_name}'. Check the filename.")
except Exception as e:
    print(f"An error occurred: {e}")