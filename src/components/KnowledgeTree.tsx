import { ChevronDown, ChevronRight, FileText, FolderOpen } from 'lucide-react';
import type { KnowledgeNode } from '../data/subjects';
export function KnowledgeTree({ nodes, selected, expanded, onToggle, onSelect, starred }: {nodes: KnowledgeNode[]; selected: string; expanded: string[]; onToggle: (id:string)=>void; onSelect:(id:string)=>void; starred:string[]}) {
 return <ul className="tree" aria-label="知识节点列表">{nodes.map(node => <li key={node.id}><div className={`tree-row ${selected === node.id ? 'selected' : ''}`}>
 {node.children ? <button className="icon-button" aria-label={`${expanded.includes(node.id)?'折叠':'展开'}${node.title}`} onClick={()=>onToggle(node.id)}>{expanded.includes(node.id)?<ChevronDown size={14}/>:<ChevronRight size={14}/>}</button> : <span className="tree-indent"/>}
 <button className="tree-label" onClick={()=>onSelect(node.id)}>{node.children?<FolderOpen size={16}/>:<FileText size={15}/>}<span>{node.title}</span>{starred.includes(node.id)&&<span className="star-dot">★</span>}</button></div>
 {node.children && expanded.includes(node.id) && <KnowledgeTree {...{selected,expanded,onToggle,onSelect,starred}} nodes={node.children}/>}</li>)}</ul>;
}
