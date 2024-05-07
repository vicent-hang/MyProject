
import {  ElMessageBox } from "element-plus";
import router from "../router";


export const remindWork = () => {
    const time = setInterval(() => {
      // 获取当前时间
      const now = new Date();
      // 检查是否为每天早上9点
      if (now.getHours() >= 9 && now.getMinutes() >= 0 && now.getSeconds() >= 0) {
         // 检查是否已经显示过弹窗
         if (!hasShownReminderToday()) {
          showReminderDialog()
            updateLastReminderTime(now);
          }
          
      }
  }, 1000); // 每秒检查一次

  const showReminderDialog = () => {
    clearInterval(time);
    ElMessageBox.confirm(
        '现在是巡查提醒时间，进行巡查任务吧！',
        '巡查提醒',
        {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info',
        center: true,
        }
    )
        .then(() => {
        // 用户点击确定按钮后的逻辑
        console.log('用户点击了确定按钮');
        router.push('/kfjk')
        })
        .catch(() => {
        // 用户点击取消按钮后的逻辑
        console.log('用户点击了取消按钮');
        });
    };


    const hasShownReminderToday = () => {
      // 获取上次提醒的时间
      const lastReminderTime = localStorage.getItem('lastReminderTime');
      
      // 如果没有记录，或者距离上次提醒时间已经超过一天，返回 false
      if (!lastReminderTime) {
        return false;
      }

      const lastReminderDate = new Date(lastReminderTime);
      const now = new Date();

      return (
        now.getDate() === lastReminderDate.getDate() &&
        now.getMonth() === lastReminderDate.getMonth() &&
        now.getFullYear() === lastReminderDate.getFullYear()
      );
    };

    const updateLastReminderTime = (time) => {
      // 更新本地存储中的提醒时间
      localStorage.setItem('lastReminderTime', time.toString());
    };
}

//危险消息提醒
export const hazardWarning = () => {
  function getRandomEvent() {
    const events = [
     {id: 1, event: '文物被损毁',weight: 1},
     {id: 2, event: '文物被盗取',weight: 1},
     {id: 3, event: '自然灾害',weight: 1},
     {id: 4, event: '场馆着火',weight: 1},
     {id: 5, event: '正常',weight: 20}
    ];
  
    const today = new Date().toLocaleDateString()+1;
    const lastReminderDate = localStorage.getItem("lastReminderDate");

    if (lastReminderDate !== today) {
      // 计算总权重
      const totalWeight = events.reduce((sum, event) => sum + event.weight, 0);

      // 生成随机数
      let randomValue = Math.random() * totalWeight;

      // 根据权重选择事件
      for (const event of events) {
        randomValue -= event.weight;
        if (randomValue <= 0) {
          const randomEvent = event.event;

          // 保存提醒状态到本地存储
          localStorage.setItem("lastReminderDate", today);
          localStorage.setItem("event",randomEvent)

          return randomEvent;
        }
      }
    }
    return localStorage.getItem("event");
  }

  // 使用示例
    return  getRandomEvent();
//   if (todayEvent) {
//     console.log(todayEvent);
//   } else {
//     console.log("今天已经提醒过了！");
//   }
}
  

