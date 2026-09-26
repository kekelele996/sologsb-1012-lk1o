export type CourseStatus = 'draft' | 'review' | 'changes' | 'frozen';
export type Difficulty = '入门' | '进阶' | '挑战';
export type CameraAngle = '正面' | '左侧 45°' | '右侧 45°' | '俯拍手部' | '全身远景';
export type CaptionPosition = '下方安全区' | '上移 15%' | '角标提示' | '画面中央';
export type GestureZone = '左侧' | '中央' | '右侧';

export interface LessonStep {
  id: string;
  title: string;
  kind: '示范' | '讲解' | '练习';
  duration: number;
  demoTitle: string;
  demoUrl: string;
  handshape: string;
  gestureZone: GestureZone;
  caption: string;
  captionPosition: CaptionPosition;
  camera: CameraAngle;
  commonMistakes: string[];
  exercise: string;
  exerciseFeedback: string;
  altText: string;
  prerequisiteId: string;
  difficulty: Difficulty;
  cuePoints: number[];
}

export interface CourseModule {
  id: string;
  title: string;
  summary: string;
  color: string;
  steps: LessonStep[];
}

export type CourseSnapshot = Omit<CourseProject, 'frozenVersions'>;

export interface FrozenVersion {
  id: string;
  label: string;
  createdAt: string;
  snapshot: CourseSnapshot;
}

export const CURRENT_VERSION_ID = 'current-working-copy';

export interface VersionSummary {
  id: string;
  label: string;
  createdAt: string;
  status: CourseStatus;
  modules: CourseModule[];
  moduleCount: number;
  stepCount: number;
  current: boolean;
}

export interface FieldChange {
  field: string;
  label: string;
  before: string;
  after: string;
}

export interface ModuleDiff {
  moduleId: string;
  title: string;
  kind: 'added' | 'missing';
  stepCount: number;
  steps: Array<{ id: string; title: string }>;
}

export interface StepDiff {
  moduleId: string;
  moduleTitle: string;
  stepId: string;
  title: string;
  kind: 'added' | 'missing' | 'changed';
  fields: FieldChange[];
}

export interface VersionDiff {
  addedModules: ModuleDiff[];
  missingModules: ModuleDiff[];
  steps: StepDiff[];
  addedStepCount: number;
  missingStepCount: number;
  changedStepCount: number;
  empty: boolean;
}

export interface CourseProject {
  id: string;
  title: string;
  teacher: string;
  audience: string;
  status: CourseStatus;
  selectedModuleId: string;
  selectedStepId: string;
  modules: CourseModule[];
  frozenVersions: FrozenVersion[];
  lastSavedAt: string;
  revision: number;
}

export interface ValidationCheck {
  id: string;
  severity: 'error' | 'warning' | 'info';
  title: string;
  detail: string;
  stepId?: string;
  moduleId?: string;
}

export const STORAGE_KEY = 'sologsb-1012-sign-course-project-v1';

export function createDemoProject(): CourseProject {
  const modules: CourseModule[] = [
    {
      id: 'module-1',
      title: '模块一 · 日常问候',
      summary: '建立手形、视线和面部表情之间的配合，完成三个基础问候。',
      color: '#15827a',
      steps: [
        {
          id: 'step-1-1',
          title: '观察“你好”的完整动作',
          kind: '示范',
          duration: 35,
          demoTitle: '你好 · 正面慢速示范',
          demoUrl: '',
          handshape: '右手掌张开，拇指向上，自额头向外送出',
          gestureZone: '右侧',
          caption: '你好：手掌从额前向前送出，同时保持微笑。',
          captionPosition: '下方安全区',
          camera: '正面',
          commonMistakes: ['手掌过于僵硬', '没有视线交流'],
          exercise: '跟随示范完成两次，每次保持两秒。',
          exerciseFeedback: '镜面检查手掌高度是否与眉线一致。',
          altText: '教师面向镜头，用右手掌从额头向前送出，并点头微笑。',
          prerequisiteId: '',
          difficulty: '入门',
          cuePoints: [4, 16, 28],
        },
        {
          id: 'step-1-2',
          title: '拆解“你好”的手形',
          kind: '讲解',
          duration: 50,
          demoTitle: '你好 · 手部近景',
          demoUrl: '',
          handshape: '四指并拢，拇指张开；掌心朝左前侧',
          gestureZone: '中央',
          caption: '注意四指并拢，动作沿身体中轴向前。',
          captionPosition: '画面中央',
          camera: '俯拍手部',
          commonMistakes: ['拇指贴住掌心', '动作方向偏向一侧'],
          exercise: '固定肩部，只移动前臂完成五次。',
          exerciseFeedback: '如果动作跑偏，先在镜前标记起点和终点。',
          altText: '手部近景展示四指并拢、拇指张开的起始手形。',
          prerequisiteId: 'step-1-1',
          difficulty: '入门',
          cuePoints: [6, 24, 42],
        },
        {
          id: 'step-1-3',
          title: '双人问候练习',
          kind: '练习',
          duration: 75,
          demoTitle: '你好 · 双人轮流练习',
          demoUrl: '',
          handshape: '保持标准手形，配合点头与视线交换',
          gestureZone: '中央',
          caption: '轮流问候，每次动作结束后停一拍，再交换角色。',
          captionPosition: '上移 15%',
          camera: '全身远景',
          commonMistakes: ['动作过早结束', '两人视线没有相遇'],
          exercise: '两人一组轮流完成问候，交换三次。',
          exerciseFeedback: '同伴负责确认视线和动作停顿。',
          altText: '两名学习者相对站立，交替做出问候动作并看向对方。',
          prerequisiteId: 'step-1-2',
          difficulty: '进阶',
          cuePoints: [10, 34, 57],
        },
      ],
    },
    {
      id: 'module-2',
      title: '模块二 · 数量表达',
      summary: '用数字、空间位置和顺序词完成价格询问。',
      color: '#8a3ffc',
      steps: [
        {
          id: 'step-2-1',
          title: '数字一到五的稳定手形',
          kind: '讲解',
          duration: 60,
          demoTitle: '数字 1—5 · 镜面视图',
          demoUrl: '',
          handshape: '食指到五指依次展开，手心朝前',
          gestureZone: '中央',
          caption: '数字一到五：从食指开始依次增加，不移动手腕。',
          captionPosition: '下方安全区',
          camera: '正面',
          commonMistakes: ['拇指遮挡手指数', '手腕左右摆动'],
          exercise: '按随机口令连续展示 1—5。',
          exerciseFeedback: '每个数字保持一秒，同伴随机报数。',
          altText: '教师手心朝前，依次伸出食指到五指，展示数字一到五。',
          prerequisiteId: '',
          difficulty: '入门',
          cuePoints: [8, 26, 44],
        },
        {
          id: 'step-2-2',
          title: '组合成“多少钱”',
          kind: '示范',
          duration: 45,
          demoTitle: '多少钱 · 双手组合动作',
          demoUrl: '',
          handshape: '双手在胸前交替翻转，随后食指向前点出',
          gestureZone: '中央',
          caption: '先做“钱”的交替手形，再用食指向前询问。',
          captionPosition: '角标提示',
          camera: '右侧 45°',
          commonMistakes: ['两手动作不同步', '疑问表情缺失'],
          exercise: '配合疑问表情完成三次询问。',
          exerciseFeedback: '录下动作，检查双手是否在胸前同一高度。',
          altText: '教师双手机械交替翻转后，食指朝前点出并抬眉疑问。',
          prerequisiteId: 'step-2-1',
          difficulty: '进阶',
          cuePoints: [5, 22, 37],
        },
      ],
    },
  ];

  return {
    id: 'sign-course-project',
    title: '零基础手语 · 问候与数量',
    teacher: '陈老师 / 特殊教育中心',
    audience: '初次接触手语的初中学习者',
    status: 'draft',
    selectedModuleId: 'module-1',
    selectedStepId: 'step-1-2',
    modules,
    frozenVersions: [],
    lastSavedAt: new Date().toISOString(),
    revision: 1,
  };
}

export function selectedModule(project: CourseProject): CourseModule {
  return project.modules.find((module) => module.id === project.selectedModuleId) ?? project.modules[0];
}

export function selectedStep(project: CourseProject): LessonStep | undefined {
  const module = selectedModule(project);
  return module?.steps.find((step) => step.id === project.selectedStepId) ?? module?.steps[0];
}

export function validateProject(project: CourseProject): ValidationCheck[] {
  const checks: ValidationCheck[] = [];
  if (!project.title.trim()) checks.push({ id: 'title', severity: 'error', title: '课程标题缺失', detail: '发布前需要为课程填写清晰标题。' });
  if (project.modules.length === 0) checks.push({ id: 'modules', severity: 'error', title: '没有课程模块', detail: '至少需要创建一个包含学习步骤的模块。' });

  project.modules.forEach((module) => {
    if (!module.steps.length) {
      checks.push({ id: `empty-${module.id}`, severity: 'error', title: `${module.title} 没有学习步骤`, detail: '空模块无法进入复核。', moduleId: module.id });
    }
    module.steps.forEach((step, index) => {
      if (!step.altText.trim()) {
        checks.push({ id: `alt-${step.id}`, severity: 'error', title: `${step.title} 缺少替代文本`, detail: '示范片段需要描述手形、移动和面部表情。', stepId: step.id, moduleId: module.id });
      }
      if (!step.caption.trim()) {
        checks.push({ id: `caption-${step.id}`, severity: 'warning', title: `${step.title} 缺少字幕`, detail: '听障学习者在静音预览时无法获得说明。', stepId: step.id, moduleId: module.id });
      }
      if (step.captionPosition === '画面中央' && (step.gestureZone === '中央' || step.camera === '俯拍手部')) {
        checks.push({ id: `overlap-${step.id}`, severity: 'error', title: `${step.title} 字幕可能遮挡动作`, detail: `字幕位于${step.captionPosition}，而主要手形位于${step.gestureZone}。`, stepId: step.id, moduleId: module.id });
      }
      if (step.duration < 20) {
        checks.push({ id: `duration-${step.id}`, severity: 'warning', title: `${step.title} 时长过短`, detail: '示范与练习不足 20 秒，学习者来不及观察和跟做。', stepId: step.id, moduleId: module.id });
      }
      if (step.prerequisiteId) {
        const prerequisiteIndex = module.steps.findIndex((candidate) => candidate.id === step.prerequisiteId);
        if (prerequisiteIndex < 0) {
          checks.push({ id: `missing-pre-${step.id}`, severity: 'error', title: `${step.title} 的前置步骤不存在`, detail: '请重新选择前置条件或移除依赖。', stepId: step.id, moduleId: module.id });
        } else if (prerequisiteIndex >= index) {
          checks.push({ id: `jump-${step.id}`, severity: 'error', title: `${step.title} 出现步骤跳级`, detail: '前置步骤位于当前步骤之后，学习顺序无法成立。', stepId: step.id, moduleId: module.id });
        }
      }
      if (step.kind === '练习' && (!step.exercise.trim() || !step.exerciseFeedback.trim())) {
        checks.push({ id: `practice-${step.id}`, severity: 'warning', title: `${step.title} 的练习反馈不完整`, detail: '练习任务需要明确完成动作和即时反馈方式。', stepId: step.id, moduleId: module.id });
      }
      if (step.commonMistakes.filter(Boolean).length === 0) {
        checks.push({ id: `mistakes-${step.id}`, severity: 'info', title: `${step.title} 尚未记录常见错误`, detail: '补充常见错误有助于教师现场提示。', stepId: step.id, moduleId: module.id });
      }
    });
  });

  return checks;
}

export function cloneProject(project: CourseProject): CourseProject {
  return structuredClone(project);
}

const STEP_FIELD_LABELS: Array<{ field: keyof LessonStep; label: string }> = [
  { field: 'title', label: '步骤标题' },
  { field: 'kind', label: '步骤类型' },
  { field: 'difficulty', label: '难度标签' },
  { field: 'duration', label: '预计时长（秒）' },
  { field: 'demoTitle', label: '示范片段名称' },
  { field: 'demoUrl', label: '本地素材地址' },
  { field: 'handshape', label: '手形说明' },
  { field: 'gestureZone', label: '主要手形区域' },
  { field: 'caption', label: '步骤字幕' },
  { field: 'captionPosition', label: '字幕位置' },
  { field: 'camera', label: '镜头角度' },
  { field: 'altText', label: '替代文本' },
  { field: 'prerequisiteId', label: '前置条件' },
  { field: 'commonMistakes', label: '常见错误' },
  { field: 'exercise', label: '练习任务' },
  { field: 'exerciseFeedback', label: '练习反馈' },
  { field: 'cuePoints', label: '检查点' },
];

function summarizeSnapshot(id: string, label: string, createdAt: string, status: CourseStatus, modules: CourseModule[], current: boolean): VersionSummary {
  return {
    id,
    label,
    createdAt,
    status,
    modules,
    moduleCount: modules.length,
    stepCount: modules.reduce((sum, module) => sum + module.steps.length, 0),
    current,
  };
}

export function getVersionSummaries(project: CourseProject): VersionSummary[] {
  const current = summarizeSnapshot(CURRENT_VERSION_ID, '当前编辑稿', project.lastSavedAt, project.status, project.modules, true);
  const frozen = project.frozenVersions.map((version) => summarizeSnapshot(version.id, version.label, version.createdAt, 'frozen', version.snapshot.modules, false));
  return [current, ...frozen];
}

export function getVersionSnapshot(project: CourseProject, versionId: string): CourseSnapshot {
  if (versionId === CURRENT_VERSION_ID) {
    const { frozenVersions: _frozenVersions, ...snapshot } = project;
    return snapshot;
  }
  return project.frozenVersions.find((version) => version.id === versionId)?.snapshot ?? getVersionSnapshot(project, CURRENT_VERSION_ID);
}

export function getVersionLabel(project: CourseProject, versionId: string): string {
  if (versionId === CURRENT_VERSION_ID) return '当前编辑稿';
  return project.frozenVersions.find((version) => version.id === versionId)?.label ?? '未知版本';
}

function resolveStep(modules: CourseModule[], stepId: string): LessonStep | undefined {
  for (const module of modules) {
    const step = module.steps.find((item) => item.id === stepId);
    if (step) return step;
  }
  return undefined;
}

function formatStepValue(field: keyof LessonStep, allModules: CourseModule[], value: unknown): string {
  if (field === 'prerequisiteId') {
    const id = value as string;
    if (!id) return '无前置条件';
    return resolveStep(allModules, id)?.title ?? '指向已删除步骤';
  }
  if (field === 'duration') return `${String(value)} 秒`;
  if (field === 'cuePoints') {
    const points = value as number[];
    return points.length ? points.map((point) => `${point}s`).join('、') : '无检查点';
  }
  if (field === 'commonMistakes') {
    const mistakes = value as string[];
    return mistakes.length ? mistakes.join('；') : '未记录';
  }
  const text = String(value ?? '').trim();
  return text || '（空）';
}

/**
 * 比较两个版本：base 视为“旧版本”，target 视为“新版本”。
 * 新增 = target 有而 base 没有；缺失 = base 有而 target 没有。
 */
export function diffVersions(base: CourseSnapshot, target: CourseSnapshot): VersionDiff {
  const baseModuleMap = new Map(base.modules.map((module) => [module.id, module]));
  const targetModuleMap = new Map(target.modules.map((module) => [module.id, module]));

  const addedModules: ModuleDiff[] = target.modules
    .filter((module) => !baseModuleMap.has(module.id))
    .map((module) => ({
      moduleId: module.id,
      title: module.title,
      kind: 'added',
      stepCount: module.steps.length,
      steps: module.steps.map((step) => ({ id: step.id, title: step.title })),
    }));

  const missingModules: ModuleDiff[] = base.modules
    .filter((module) => !targetModuleMap.has(module.id))
    .map((module) => ({
      moduleId: module.id,
      title: module.title,
      kind: 'missing',
      stepCount: module.steps.length,
      steps: module.steps.map((step) => ({ id: step.id, title: step.title })),
    }));

  const steps: StepDiff[] = [];
  target.modules.forEach((targetModule) => {
    const baseModule = baseModuleMap.get(targetModule.id);
    if (!baseModule) return; // 新增模块整体呈现
    const baseStepMap = new Map(baseModule.steps.map((step) => [step.id, step]));
    const targetStepMap = new Map(targetModule.steps.map((step) => [step.id, step]));

    targetModule.steps.forEach((targetStep, targetIndex) => {
      const baseStep = baseStepMap.get(targetStep.id);
      if (!baseStep) {
        steps.push({ moduleId: targetModule.id, moduleTitle: targetModule.title, stepId: targetStep.id, title: targetStep.title, kind: 'added', fields: [] });
        return;
      }
      const fields: FieldChange[] = [];
      for (const { field, label } of STEP_FIELD_LABELS) {
        const beforeValue = formatStepValue(field, base.modules, baseStep[field]);
        const afterValue = formatStepValue(field, target.modules, targetStep[field]);
        if (beforeValue !== afterValue) fields.push({ field, label, before: beforeValue, after: afterValue });
      }
      const baseIndex = baseModule.steps.findIndex((step) => step.id === targetStep.id);
      if (baseIndex !== targetIndex) {
        fields.push({ field: 'order', label: '步骤顺序', before: `第 ${baseIndex + 1} 步`, after: `第 ${targetIndex + 1} 步` });
      }
      if (fields.length) {
        steps.push({ moduleId: targetModule.id, moduleTitle: targetModule.title, stepId: targetStep.id, title: targetStep.title, kind: 'changed', fields });
      }
    });

    baseModule.steps.forEach((baseStep) => {
      if (!targetStepMap.has(baseStep.id)) {
        steps.push({ moduleId: targetModule.id, moduleTitle: targetModule.title, stepId: baseStep.id, title: baseStep.title, kind: 'missing', fields: [] });
      }
    });
  });

  const addedStepCount = steps.filter((step) => step.kind === 'added').length + addedModules.reduce((sum, module) => sum + module.stepCount, 0);
  const missingStepCount = steps.filter((step) => step.kind === 'missing').length + missingModules.reduce((sum, module) => sum + module.stepCount, 0);
  const changedStepCount = steps.filter((step) => step.kind === 'changed').length;

  return {
    addedModules,
    missingModules,
    steps,
    addedStepCount,
    missingStepCount,
    changedStepCount,
    empty: addedModules.length === 0 && missingModules.length === 0 && steps.length === 0,
  };
}

/**
 * 从旧版本恢复：以快照内容创建一份新的草稿，历史冻结版本全部保留。
 * 恢复后优先沿用仍存在的模块和步骤选中状态，找不到则回退到快照选择。
 */
export function restoreProjectFromVersion(project: CourseProject, versionId: string): CourseProject {
  const snapshot = getVersionSnapshot(project, versionId);
  const selectedModuleId = snapshot.modules.some((module) => module.id === project.selectedModuleId)
    ? project.selectedModuleId
    : (snapshot.selectedModuleId && snapshot.modules.some((module) => module.id === snapshot.selectedModuleId)
      ? snapshot.selectedModuleId
      : snapshot.modules[0]?.id ?? '');
  const selectedModule = snapshot.modules.find((module) => module.id === selectedModuleId);
  const selectedStepId = selectedModule?.steps.some((step) => step.id === project.selectedStepId)
    ? project.selectedStepId
    : (selectedModule?.steps.some((step) => step.id === snapshot.selectedStepId)
      ? snapshot.selectedStepId
      : selectedModule?.steps[0]?.id ?? '');

  return {
    ...structuredClone(snapshot),
    status: 'draft',
    frozenVersions: structuredClone(project.frozenVersions),
    selectedModuleId,
    selectedStepId,
    lastSavedAt: new Date().toISOString(),
    revision: project.revision + 1,
  };
}
