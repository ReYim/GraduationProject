import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/admin/login',
    method: 'post',
    data
  })
}

export function add_student(data) {
  return request({
    url: '/admin/form',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/admin/info',
    method: 'get',
    params: { token }
  })
}

export function logout(data) {
  return request({
    url: '/admin/logout',
    method: 'post',
    data
  })
}
