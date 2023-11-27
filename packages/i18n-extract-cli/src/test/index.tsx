//@ts-nocheck
import React, { useContext } from 'react'
import { withRouter } from 'react-router-dom'
import { Menu, Dropdown, Select } from 'antd'
import { useLocalStorageState } from 'ahooks'
import intl from 'react-intl-universal'
import {
  CaretDownOutlined,
  LogoutOutlined,
  UnorderedListOutlined,
  BookOutlined,
} from '@ant-design/icons'
import { LoginContext } from '@/context'
import './index.less'

const { Option } = Select

const MoreLink = () => (
  <Menu>
    <Menu.Item key="1">
      <a href="https://salon.netease.com/" target="_blank" rel="noreferrer">
        {intl.get('index-hbrmn4qcokg').d('Learning GO 学习系统')}
      </a>
    </Menu.Item>
    {/*<Menu.Item key="2">*/}
    {/*    <a href="https://kms.netease.com/" target="_blank" rel="noreferrer">*/}
    {/*        网易KM系统*/}
    {/*    </a>*/}
    {/*</Menu.Item>*/}
    <Menu.Item key="3">
      <a
        href="http://zhitu.netease.com/#/template?projectId=508065473142087680"
        target="_blank"
        rel="noreferrer"
      >
        {intl.get('index-7wmp5qqlu0a').d('自助制图系统')}
      </a>
    </Menu.Item>
    {/*<Menu.Item key="4">*/}
    {/*    <a href="https://subtitles.ai.163.com/" target="_blank" rel="noreferrer">*/}
    {/*        易智字幕工具*/}
    {/*    </a>*/}
    {/*</Menu.Item>*/}
    {/*<Menu.Item key="5">*/}
    {/*    <a href="https://easymeeting.ai.163.com/" target="_blank" rel="noreferrer">*/}
    {/*        易智语音转写*/}
    {/*    </a>*/}
    {/*</Menu.Item>*/}
  </Menu>
)

// 前后台使用的是同一个域名，后台项目资源用/mng前缀做nginx转发
const Notebook = () => (
  <Menu>
    <Menu.Item key="1">
      <a
        href="https://nos.netease.com/rms/7ded09c6943f6659d94a48ffeeb02f19?contentType=application/pdf"
        target="_blank"
        rel="noreferrer"
      >
        {intl.get('index-yoj1neov9so').d('管理员操作手册')}
      </a>
    </Menu.Item>
    {/*<Menu.Item key="2">*/}
    {/*    <a href="https://nos.netease.com/rms/40cdcae9403c098ea9472e35aca21b98?contentType=application/pdf" target="_blank" rel="noreferrer">*/}
    {/*        讲师操作手册*/}
    {/*    </a>*/}
    {/*</Menu.Item>*/}
    {/*<Menu.Item key="3">*/}
    {/*    <a href="https://nos.netease.com/rms/bb175c49cdd7dd0031086726b4929a3f?contentType=application/pdf" target="_blank" rel="noreferrer">*/}
    {/*        直播操作手册*/}
    {/*    </a>*/}
    {/*</Menu.Item>*/}
  </Menu>
)

function Header(props: any) {
  const { onChangeLocale } = props
  const [locale, setLocale] = useLocalStorageState('language', {
    defaultValue: 'zh',
    serializer: (v) => v ?? '',
    deserializer: (v) => v,
  })

  const onChange = (value: string) => {
    onChangeLocale(value)
    setLocale(value)
  }

  const { authInfo } = useContext(LoginContext)

  // 退出登录
  const logout = () => {
    location.href = `/api/auth/login/openId/logout?returnUrl=${location.origin}/mng`
  }

  return (
    <div className="m-header">
      <div className="content">
        <div className="logo">
          <i className="iconfont icon-yi" /> <span>· Learning GO</span>
          <span className="name">{intl.get('appName')}</span>
        </div>
        <div className="right">
          <Dropdown overlay={Notebook} placement="bottomCenter">
            <div className="f-cp">
              <BookOutlined /> <span>{intl.get('index-sp3dcqbuu18').d('指导手册')}</span>
            </div>
          </Dropdown>

          {/*  <Dropdown overlay={MoreLink} placement="bottomCenter">*/}
          {/*      <div className="right-item more-link">*/}
          {/*          <UnorderedListOutlined /> <span>相关链接</span>*/}
          {/*      </div>*/}
          {/*  </Dropdown>*/}

          {/*<Select bordered={false} onChange={onChange} value={locale}>*/}
          {/*  <Option value="zh">中文</Option>*/}
          {/*  <Option value="en">English</Option>*/}
          {/*</Select>*/}

          <Dropdown
            overlay={
              <Menu>
                <Menu.Item onClick={logout}>
                  <span>{/*<LogoutOutlined style={{ fontSize: '16px' }} /> 退出*/}</span>
                </Menu.Item>
              </Menu>
            }
            placement="bottomRight"
          >
            <div className="name">
              <span>Hi，{authInfo.name}</span> <CaretDownOutlined />
            </div>
          </Dropdown>
        </div>
      </div>
    </div>
  )
}

export default withRouter(Header)
