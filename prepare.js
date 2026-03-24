import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

export async function invoketheDocument(filePath) {
  const loader = new PDFLoader(filePath, { splitPages: false });
  // const loader = new PDFLoader(filePath);
  const docs = await loader.load();
  console.log("document=>", docs[0].pageContent);
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    chunkOverlap: 100,
  });

  const texts = await splitter.splitText(docs[0].pageContent);
  console.log("chunks=>", texts);
}
