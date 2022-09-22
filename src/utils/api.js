import request from "./request.js";

export function login(user, password) {
    /**
     * @向服务端发送post登录请求 user，password作为参数
     */
    return request.post("/login", {user: user, password: password})
}

export function getAllStudent() {
    /**
     * @向服务端请求学生信息用于Vue渲染组件
     */
    return request.post("/getAllStudentInfo")
}

export function deleteStudent(user) {
    /**
     * @向服务端发送被删除的学生的信息
     */
    return request.post("/delStudent", {user: user})
}

export function upDataStudent(Object) {
    /**
     * @向服务端发送要修改的学生的信息
     */
    return request.post("/upDataStudent", {data: Object})
}

export function addStudent(Object) {
    /**
     * @向服务端发送要添加的学生的信息
     */
    return request.post("/addStu", {data: Object})
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

export function getAllCourse() {
    /**
     * @获取每个课程的人数
     */
    return request.post("/getAllCourse")
}

export function getAllStudentScore() {
    /**
     * @查询单个课程全部学生成绩
     */
    return request.post("/getAllStudentScore")
}

export function getOneStudentScore(user) {
    /**
     * @获取单个学生全部课程成绩
     */
    return request.post("/getOneStudentScore", {user})
}