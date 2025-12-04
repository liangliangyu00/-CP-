import { Actor } from './types';

// ============================================================================
// 核心逻辑：使用搜索引擎 Image Proxy API (基于 Bing Thumbnails)
// ============================================================================
// 原理：直接请求必应的缩略图服务器，传入查询词 (q)，它会动态返回搜索到的第一张图片。
// 优势：
// 1. 无需维护图片库，名字对了就有图。
// 2. 纯前端，无跨域问题 (CORS Friendly for images)。
// 3. 自动裁剪 (c=7 Smart Crop)。
// ============================================================================
const getSmartImageUrl = (name: string) => {
  // 关键词优化：加上 "明星" 或 "Actor" 提高准确率，避免搜到同名物品
  const query = `${name} 明星 写真`;
  
  // 参数详解：
  // q: 查询词
  // w: 宽 400
  // h: 高 550 (保持 3:4 甚至更修长的比例)
  // c: 7 (Smart Crop，智能人脸对焦裁剪)
  // rs: 1 (Resize strategy)
  // p: 0 (无预览)
  return `https://tse4.mm.bing.net/th?q=${encodeURIComponent(query)}&w=400&h=550&c=7&rs=1&p=0`;
};

export const ACTOR_DATA: Actor[] = [
  // ========================= 攻方 (Gong) =========================
  { 
    name: "吴磊", 
    photo_url: getSmartImageUrl("吴磊"), 
    tags: ["少年感", "国民弟系", "Alpha", "男友力"], 
    role_type: "gong" 
  },
  { 
    name: "陈坤", 
    photo_url: getSmartImageUrl("陈坤"), 
    tags: ["电影咖", "资深", "邪魅", "气质"], 
    role_type: "gong" 
  },
  { 
    name: "张震", 
    photo_url: getSmartImageUrl("张震"), 
    tags: ["硬汉", "电影咖", "禁欲系", "成熟"], 
    role_type: "gong" 
  },
  { 
    name: "李现", 
    photo_url: getSmartImageUrl("李现"), 
    tags: ["霸总", "荷尔蒙", "老公", "男友力"], 
    role_type: "gong" 
  },
  { 
    name: "赤西仁", 
    photo_url: getSmartImageUrl("赤西仁 Jin Akanishi"), 
    tags: ["偶像", "颓废", "Bad Boy", "浪子"], 
    role_type: "gong" 
  },
  { 
    name: "町田启太", 
    photo_url: getSmartImageUrl("町田启太"), 
    tags: ["气质", "绅士", "Alpha", "治愈系"], 
    role_type: "gong" 
  },
  { 
    name: "李洙赫", 
    photo_url: getSmartImageUrl("李洙赫 Lee Soo Hyuk"), 
    tags: ["模特", "禁欲", "吸血鬼", "高冷"], 
    role_type: "gong" 
  },
  { 
    name: "金城武", 
    photo_url: getSmartImageUrl("金城武"), 
    tags: ["混血", "沉默", "神颜", "经典"], 
    role_type: "gong" 
  },
  { 
    name: "吴彦祖", 
    photo_url: getSmartImageUrl("吴彦祖"), 
    tags: ["完美", "老公", "Alpha", "颜值天花板"], 
    role_type: "gong" 
  },
  { 
    name: "黄景瑜", 
    photo_url: getSmartImageUrl("黄景瑜"), 
    tags: ["军装", "荷尔蒙", "硬汉", "体育生"], 
    role_type: "gong" 
  },
  { 
    name: "苏志燮", 
    photo_url: getSmartImageUrl("苏志燮"), 
    tags: ["忧郁", "熟男", "雕塑", "实力派"], 
    role_type: "gong" 
  },
  { 
    name: "高修", 
    photo_url: getSmartImageUrl("高修 Go Soo"), 
    tags: ["实力派", "眼神杀", "低调", "内敛"], 
    role_type: "gong" 
  },
  { 
    name: "赵寅成", 
    photo_url: getSmartImageUrl("赵寅成"), 
    tags: ["长腿", "熟男", "气质", "模特"], 
    role_type: "gong" 
  },
  { 
    name: "金宇彬", 
    photo_url: getSmartImageUrl("金宇彬"), 
    tags: ["模特", "霸总", "力量感", "反派"], 
    role_type: "gong" 
  },
  { 
    name: "维斯塔潘", 
    photo_url: getSmartImageUrl("Max Verstappen"), 
    tags: ["冠军", "战斗狂", "霸总", "F1+Alpha"], 
    role_type: "gong" 
  },
  { 
    name: "布拉德·皮特", 
    photo_url: getSmartImageUrl("Brad Pitt"), 
    tags: ["电影巨星", "经典", "潇洒", "魅力"], 
    role_type: "gong" 
  },
  { 
    name: "宋威龙", 
    photo_url: getSmartImageUrl("宋威龙"), 
    tags: ["少年感", "雕塑感", "腹黑", "弟弟"], 
    role_type: "gong" 
  },
  { 
    name: "敖瑞鹏", 
    photo_url: getSmartImageUrl("敖瑞鹏"), 
    tags: ["古装", "阳光", "少年气", "野性"], 
    role_type: "gong" 
  },
  { 
    name: "安德鲁·加菲尔德", 
    photo_url: getSmartImageUrl("Andrew Garfield"), 
    tags: ["蜘蛛侠", "少年气", "委屈", "英伦"], 
    role_type: "gong" 
  },
  { 
    name: "Henrik Holm", 
    photo_url: getSmartImageUrl("Henrik Holm Skam"), 
    tags: ["挪威", "清冷", "忧郁", "贵族"], 
    role_type: "gong" 
  },
  { 
    name: "陈伟霆", 
    photo_url: getSmartImageUrl("陈伟霆"), 
    tags: ["港风", "雅痞", "酷盖", "荷尔蒙"], 
    role_type: "gong" 
  },
  { 
    name: "韩东君", 
    photo_url: getSmartImageUrl("韩东君"), 
    tags: ["肌肉", "硬汉", "运动系", "东北A"], 
    role_type: "gong" 
  },
  { 
    name: "朱轩洋", 
    photo_url: getSmartImageUrl("朱轩洋"), 
    tags: ["新生代", "野性", "痞帅", "台剧"], 
    role_type: "gong" 
  },

  // ========================= 受方 (Shou) =========================
  { 
    name: "刘昊然", 
    photo_url: getSmartImageUrl("刘昊然"), 
    tags: ["电影感", "清爽", "盐系", "少年"], 
    role_type: "shou" 
  },
  { 
    name: "龚俊", 
    photo_url: getSmartImageUrl("龚俊"), 
    tags: ["流量", "阳光美人", "钓系", "少年"], 
    role_type: "shou" 
  },
  { 
    name: "许光汉", 
    photo_url: getSmartImageUrl("许光汉"), 
    tags: ["跨区人气", "清冷", "盐系", "年上"], 
    role_type: "shou" 
  },
  { 
    name: "龟梨和也", 
    photo_url: getSmartImageUrl("龟梨和也"), 
    tags: ["妖孽", "偶像", "冷艳", "舞台"], 
    role_type: "shou" 
  },
  { 
    name: "二宫和也", 
    photo_url: getSmartImageUrl("二宫和也"), 
    tags: ["可爱", "清秀", "少年感", "游戏宅"], 
    role_type: "shou" 
  },
  { 
    name: "赤楚卫二", 
    photo_url: getSmartImageUrl("赤楚卫二"), 
    tags: ["清纯", "狗狗系", "舞台", "善良"], 
    role_type: "shou" 
  },
  { 
    name: "赵一博", 
    photo_url: getSmartImageUrl("赵一博"), 
    tags: ["少年感", "偶像", "乖巧", "弟弟"], 
    role_type: "shou" 
  },
  { 
    name: "乔治·拉塞尔", 
    photo_url: getSmartImageUrl("George Russell F1"), 
    tags: ["绅士", "威廉", "阳光", "F1+Omega"], 
    role_type: "shou" 
  },
  { 
    name: "杰西·埃森伯格", 
    photo_url: getSmartImageUrl("Jesse Eisenberg"), 
    tags: ["宅系", "神经质", "文艺", "CEO"], 
    role_type: "shou" 
  }
];