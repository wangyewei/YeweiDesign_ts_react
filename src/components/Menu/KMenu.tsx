import React, { useState, createContext, FC } from "react";
import classNames from "classnames";
import { MenuItemProps } from './KMenuItem'

type MenuMode = 'horizontal' | 'vertical'
type SelectCallbak = (selectedIndex: string) => void

export interface MenuProps {
  /**默认选中的索引 */
  defaultIndex?: string;
  className?: string;
  /**横纵向展示方式 */
  mode?: MenuMode;
  style?: React.CSSProperties;
  /**选中后的回调函数 */
  onSelect?: SelectCallbak;
  /**默认选中的下拉菜单索引 */
  defaultOpenSubMenus?: string[];
}

interface IMenuContext {
  index: string;
  onSelect?: SelectCallbak;
  mode?: MenuMode;
  defaultOpenSubMenus?: string[];
}

export const MenuContext = createContext<IMenuContext>({ index: '0' })
/**
 * 开发中最常用的导航菜单栏
 *  
 * ### 引用方法
 * 
 * ~~~js
 * import { KMenu, KMenuItem, KSubMenu } from '06k4-design'
 * ~~~
 */
export const KMenu: FC<MenuProps> = props => {
  const { className, mode, style, children, defaultIndex, onSelect, defaultOpenSubMenus } = props
  const [currentActive, setActive] = useState(defaultIndex)
  const classes = classNames('yewei-menu', className, {
    'yewei-menu-vertical': mode === 'vertical',
    'yewei-menu-horizontal': mode !== 'vertical'
  })

  const handleClick = (index: string): void => {
    setActive(index)
    if (onSelect) {
      onSelect(index)
    }
  }

  const passedContext: IMenuContext = {
    index: currentActive ? currentActive : '0',
    onSelect: handleClick,
    mode,
    defaultOpenSubMenus
  }

  const renderChildern = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>
      const { displayName } = childElement.type
      if (displayName === 'KMenuItem' || displayName === 'KSubMenu') {
        return React.cloneElement(childElement, { index: index.toString() })
      } else {
        throw Error('yewei-design-Waring: KMenu has a child witch is not a KMenuItem component')
      }
    })
  }

  return (
    <MenuContext.Provider value={passedContext}>
      <ul className={classes}
        style={style}
        data-testid="test-menu">
        {renderChildern()}
      </ul>
    </MenuContext.Provider>
  )
}

KMenu.defaultProps = {
  defaultIndex: '0',
  mode: 'horizontal',
  defaultOpenSubMenus: [],
}

export default KMenu;