export type Subject = 'english' | 'law' | 'politics';
export interface KnowledgeNode { id: string; title: string; content: string; children?: KnowledgeNode[] }
export const subjects: { id: Subject; name: string; tag: string; description: string; nodes: KnowledgeNode[] }[] = [
 {id:'english',name:'考研英语',tag:'ENGLISH',description:'从词汇积累到阅读逻辑，把每一次理解沉淀下来。',nodes:[
 {id:'en-vocab',title:'核心词汇',content:'通过词根、语境和间隔复习建立词汇网络。',children:[{id:'en-root',title:'词根与词缀',content:'trans- 表示跨越或转变，例如 transport、transform。结合例句记忆，避免孤立背词。'},{id:'en-context',title:'熟词僻义',content:'address 除“地址”外，也可表示“处理、应对”。阅读时优先根据句子语境确定词义。'}]},
 {id:'en-reading',title:'阅读理解',content:'先识别文章结构，再定位题干信息，最后比较选项。',children:[{id:'en-main',title:'主旨与段落逻辑',content:'关注首尾段、转折和重复出现的核心概念。区分作者观点与引用观点。'},{id:'en-infer',title:'推理判断',content:'推理必须有文本依据。警惕扩大范围、绝对化表达及偷换概念。'}]},
 {id:'en-writing',title:'写作表达',content:'以清晰结构、准确表达为核心。',children:[{id:'en-letter',title:'应用文写作',content:'明确写信目的，分点组织内容，使用与收信人关系匹配的语气。'},{id:'en-essay',title:'图画与图表作文',content:'描述关键信息，解释含义，以有依据的建议收尾。'}]}]},
 {id:'law',name:'法律硕士',tag:'LAW',description:'连接概念、规则与案例，构建有条理的法律知识体系。',nodes:[
 {id:'law-crime',title:'刑法学',content:'以犯罪构成与刑事责任为主线，结合案例理解规范。',children:[{id:'law-elements',title:'犯罪构成',content:'传统四要件包括犯罪客体、犯罪客观方面、犯罪主体与犯罪主观方面。学习时注意不同理论体系的分析路径。'},{id:'law-defense',title:'正当防卫',content:'围绕不法侵害、防卫时间、防卫意图、防卫对象和防卫限度分析，注意特殊防卫规则。'}]},
 {id:'law-civil',title:'民法学',content:'理解民事权利、法律行为和责任之间的关系。',children:[{id:'law-contract',title:'合同的成立与效力',content:'区分合同成立与合同生效。结合要约、承诺及效力规则，分层判断案例。'},{id:'law-property',title:'物权变动',content:'区分物权行为与债权关系，关注不动产登记、动产交付及法定例外。'}]},
 {id:'law-theory',title:'法理学与宪法',content:'建立法的基本概念、法律关系与国家基本制度的框架。',children:[{id:'law-relation',title:'法律关系',content:'法律关系通常包括主体、客体和内容，内容表现为法律权利和法律义务。'}]}]},
 {id:'politics',name:'思想政治理论',tag:'POLITICS',description:'梳理理论脉络，结合时代背景理解关键命题。',nodes:[
 {id:'pol-marx',title:'马克思主义基本原理',content:'从哲学、政治经济学与科学社会主义三个部分建立框架。',children:[{id:'pol-conflict',title:'矛盾的普遍性与特殊性',content:'矛盾的普遍性与特殊性相互联结；坚持具体问题具体分析，注意共性与个性的关系。'},{id:'pol-practice',title:'实践与认识',content:'实践是认识的来源、发展动力、目的和检验真理的唯一标准。认识具有反复性和无限性。'}]},
 {id:'pol-history',title:'中国近现代史纲要',content:'以历史进程、重大事件和人民的选择为主线。',children:[{id:'pol-timeline',title:'历史阶段与重大转折',content:'建立时间轴，结合各阶段社会主要矛盾与历史任务理解事件意义。'}]},
 {id:'pol-thought',title:'思想道德与法治',content:'联系个人成长与社会实践理解价值和规范。',children:[{id:'pol-values',title:'社会主义核心价值观',content:'从国家、社会、公民三个层面梳理核心价值观，结合实际情境理解。'}]}]}
];
export function flatten(nodes: KnowledgeNode[]): KnowledgeNode[] { return nodes.flatMap(n => [n, ...flatten(n.children ?? [])]); }
