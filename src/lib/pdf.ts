import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';
import workerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
GlobalWorkerOptions.workerSrc = workerUrl;
export async function extractPdf(file: File): Promise<{ text: string; pages: number }> {
 const task = getDocument({ data: new Uint8Array(await file.arrayBuffer()) });
 try { const pdf = await task.promise; const chunks: string[] = [];
 for (let i = 1; i <= pdf.numPages; i++) { const page = await pdf.getPage(i); const content = await page.getTextContent(); chunks.push(content.items.map(item => 'str' in item ? item.str : '').join(' ')); }
 return {text: chunks.join('\n\n'), pages: pdf.numPages};
 } finally { await task.destroy(); }
}
