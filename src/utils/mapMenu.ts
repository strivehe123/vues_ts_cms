import type { url } from 'inspector'
import type { url } from 'inspector'
import type { RouteRecordRaw } from 'vue-router'

function loadLocalRoutes() {
  const localRoutes: RouteRecordRaw[] = []
  const files: Record<string, any> = import.meta.glob('../router/main/**/*.ts', { eager: true })
  for (const key in files) {
    const module = files[key]
    localRoutes.push(module.default)
  }
  return localRoutes
}
export let firstMenu: any = null
export function mapMenuToRoutes(menuData: any[]) {
  const localRoutes = loadLocalRoutes()
  const routes: RouteRecordRaw[] = []
  for (const menu of menuData) {
    for (const subMenu of menu.children) {
      const route = localRoutes.find((item) => item.path === subMenu.url)
      if (route) {
        if (
          !routes.find((item) => {
            item.path === menu.url
          })
        ) {
          routes.push({ path: menu.url, redirect: route.path })
        }
        routes.push(route)
      }
      if (!firstMenu && route) firstMenu = subMenu
    }
  }
  return routes
}

export function mapPathToMenu(path: string, menuData: any[]) {
  for (const menu of menuData) {
    for (const subMenu of menu.children) {
      if (subMenu.url === path) {
        return subMenu
      }
    }
  }
  return undefined
}
interface IMenu {
  url: string
  name: string
  children: IMenu[]
}
interface IBreadCrumb {
  path: string
  name: string
}
export function mapPathToBreadcrumb(path: string, menuData: IMenu[]) {
  const breadcrumbs: IBreadCrumb[] = []
  for (const menu of menuData) {
    for (const subMenu of menu.children) {
      if (subMenu.url === path) {
        breadcrumbs.push({ path: menu.url, name: menu.name })
        breadcrumbs.push({ path: subMenu.url, name: subMenu.name })
      }
    }
  }
  return breadcrumbs
}
