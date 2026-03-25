/**
 * step 1:Indexing
 * 1.Load the document -pdf,txt=done
 * 2.chunk the document=done
 * 3.generate vector embeding
 * 4.store the vector embeding in vector database
 *
 * step 2: using the chatbot
 * 1.setup llm
 * 2. add retrivel step
 * 3. pass input + relevant info to llm
 * 4. congratulation llm generate ans based on that
 */

import { invoketheDocument } from "./prepare.js";

invoketheDocument("./cg-internal-docs.pdf");
