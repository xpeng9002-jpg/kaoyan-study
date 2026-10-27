import { describe, expect, it } from 'vitest';
import constitution from './constitution.json';
import { flatten, findPath, subjects } from './subjects';
describe('宪法资料导入完整性', () => {
 it('保留333个原始节点、四节及唯一ID', () => {
  const nodes = flatten(constitution.children);
  expect(nodes).toHaveLength(333);
  expect(new Set(nodes.map(n=>n.id)).size).toBe(333);
  expect(constitution.children[0].children.map(n=>n.title)).toEqual(['第一节 宪法概述','第二节 宪法的基本原则','第三节 宪法规范','第四节 宪法的产生与发展概述']);
  expect(subjects.find(s=>s.id==='law')?.nodes).toContainEqual(constitution);
 });
 it('保持考频范围，叶子可追溯整章统计而非复制统计', () => {
  const leaf=flatten(constitution.children).find(n=>n.title==='核心功能：保障公民权利、规范国家权力运作')!;
  expect(leaf).toBeDefined();
  expect(leaf.annotations).toBeUndefined();
  const path=findPath([constitution],leaf.id);
  expect(path[1].annotations?.[0]).toContain('宪法基本理论整章');
  expect(path.flatMap(n=>n.annotations??[]).join(' ')).toContain('知识点合并统计');
  expect(constitution.content).toContain('2014—2024');
  expect(flatten(constitution.children).some(n=>n.title.includes('里程碑续文在下一PDF'))).toBe(true);
 });
});
