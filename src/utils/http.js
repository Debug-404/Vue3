import request from "./request.js";

export function login(user, password) {
    /**
     * @向服务端发送post登录请求 user，password作为参数
     */
    return request.post("/login", {user: user, password: password})
}

export function datalist() {
    /**
     * @向服务端请求学生信息用于Vue渲染组件
     */
    return request.post("/getStudnet")
}

export function deleteStudent(user) {
    /**
     * @向服务端发送被删除的学生的信息
     */
    return request.post("/delStu", {user: user})
}

export function modifyData(Object) {
    /**
     * @向服务端发送要修改的学生的信息
     */
    return request.post("/updataStu", {data: Object})
}

export function addStudent(Object) {
    /**
     * @向服务端发送要添加的学生的信息
     */
    return request.post("/addStu", {data: Object})
}


export function LogOut(user) {
    /**
     * @退出登录向服务端请求删除cookie
     */
    return request.post("/Logout", {user: user})
}

export function changePassword(user, password) {
    /**
     * @修改管理员密码
     */
    return request.post("/changePassword", {user, password})
}

export function selPassword() {
    /**
     * @校验当前密码是否一致
     */
}

export function selScore() {
    /**
     * @查询全部学生成绩
     */
    return request.post("/Score")
}

export function selectCourse() {
    /**
     * @获取每个课程的人数
     */
    return request.post("/Course")
}

export function getOneStudentScore(user) {
    /**
     * @获取单个学生课程成绩
     */
    return request.post("/getOneStudent", {user})
}