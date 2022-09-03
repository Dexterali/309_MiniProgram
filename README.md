# BNU AI 309预约系统


## bug 日志

1. 提交的信息不可见：
   1. 一种问题是该人提交了多次预约信息，但是只显示一次，是因为wxml没有循环渲染
   2. 另外一种情况是：用户登陆的账户和提交信息的账号不是同一个账号，而信息展示是根据登录账号进行sql查询的   -- 已解决

2. 冲突检测问题

3. 预约冲突，却没有提示冲突   -- 已解决

4. 预约信息中日历显示问题

5. 时间美化问题         -- 已解决

6. 不可预约旧的时间     -- 已解决

7. 手机号码没有插入     -- 已解决

8. sql更新姓名          -- 已解决