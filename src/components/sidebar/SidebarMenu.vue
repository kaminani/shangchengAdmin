<script>
const sidebarMenu = [
  {
    icon: "fa fa-th",
    title: "商品管理",
    children: [
      { path: "/Goods", title: "商品管理" },
      { path: "/Classify", title: "分类管理" }
    ]
  },
  {
    icon: "fa fa-tags",
    title: "栏目管理",
    children: [
      {path: "/Column", title: "栏目配置" },
      // { path: "/ColumnGoods", title: "栏目商品管理" }
    ]
  },
  {
    icon: "fa fa-align-left",
    title: "订单管理",
    children: [
      { path: "/ShopOrder", title: "在线商城订单管理" },
      // { path: "/VendingMachine", title: "售货机订单管理" }
    ]
  },
  {
    icon: "fa fa-users",
    title: "用户管理",
    children: [{ path: "/User", title: "用户列表" }]
  },
  {
    icon: "fa fa-bicycle",
    title: "配送员管理",
    children: [{ path: "/Diliveryman", title: "配送员列表" }]
  },
  {
    icon: "fa fa-chart-pie",
    title: "数据管理",
    children: [
      { path: "/DataDaily", title: "商品销售数量" },
      { path: "/Deal", title: "交易明细表" }
    ]
  },
  {
    icon: "fa fa-tags",
    title: "营销管理",
    children: [
      { path: "/Banner", title: "Banner配置" },
      { path: "/Article", title: "文章管理" },
      { path: "/Recharge", title: "充值活动" }
    ]
  }
];
const userMenu = [
  {
    icon: "fa fa-align-left",
    title: "订单管理",
    children: [
      { path: "/ShopOrder", title: "在线商城订单管理" },
    ]
  }
];
export default {
  sidebarMenu,
  userMenu
};
</script>
