function rightBound(nums, target) {
  let left = 0,
    right = nums.length - 1;
  while (left <= right) {
    let mid = left + Math.floor((right - left) / 2);

    if (nums[mid] === target) {
      left = mid + 1;
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else if (nums[mid] > target) {
      right = mid - 1;
    }
  }
}

/*服务号近七天题目输出*/
var service = {
  "2020-10-12": {
    tidou: "500",
    datalist: [
      {
        date: "2020-10-12",
        question: "今天早上吃的_中午吃的_？",
        options: [],
        answer: "包子_黄焖鸡",
      },
      {
        date: "2020-10-12",
        question: "中国的首都是上海吗？",
        options: ["是", "否"],
        answer: "1",
      },
      {
        date: "2020-10-12",
        question: "中国的首都是_",
        options: [],
        answer: "北京",
      },
      {
        date: "2020-10-12",
        question: "1+1=?",
        options: ["1", "2", "3", "4"],
        answer: "1",
      },
    ],
  },
  "2020-10-11": {
    tidou: "400",
    datalist: {
      4: {
        date: "2020-10-11",
        question: "今天你不开心对吗？",
        options: ["正确", "错误", "不确定"],
        answer: "0_2",
      },
      5: {
        date: "2020-10-11",
        question: "上海的标志性建筑是_",
        options: [],
        answer: "东方明珠",
      },
    },
  },
  "2020-10-09": {
    tidou: "200",
    datalist: {
      6: {
        date: "2020-10-09",
        question: "这是一个典型送分题__",
        options: [],
        answer: "给分",
      },
      7: {
        date: "2020-10-09",
        question: "以下哪个是王小波的书（）",
        options: ["青铜时代", "局外人", "情人", "荒诞"],
        answer: "0_3",
      },
    },
  },
};
