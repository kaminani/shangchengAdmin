<script>
import Goods from "../pages/goods/GoodsManagement";
import Classify from "../pages/goods/Classify";
import AddGoods from "../pages/goods/AddGoods";
import EditGoods from "../pages/goods/EditGoods";
import ShopOrder from "../pages/OrderManagement/ShopOrder";
// import VendingMachine from "../pages/OrderManagement/VendingMachine";
import OrderPayment from "../pages/OrderManagement/OrderPayment";
import Article from "../pages/MarketingManagement/Article";
import Banner from "../pages/MarketingManagement/Banner";
import Recharge from "../pages/MarketingManagement/Recharge";
import User from "../pages/UserManagement/user";
import Diliveryman from '../pages/Dispatching/Diliveryman';
import Login from "../pages/Account/Login";
import ViewArticle from '../pages/MarketingManagement/ViewArticle';
import EditArticle from '../pages/MarketingManagement/EditArticle';
import ColumnGoods from '../pages/ColumnManagement/ColumnGoods';
import Column from '../pages/ColumnManagement/Column';
import addBanner from '../pages/MarketingManagement/addBanner';
import EditBanner from '../pages/MarketingManagement/EditBanner';
import createArticle from '../pages/MarketingManagement/createArticle';
import Deal from '../pages/DataManagement/Deal';
import DataDaily from '../pages/DataManagement/DataDaily';
import VueRouter from "vue-router";

const routes = [
  { path: "/", component: Login },
  { path: "/Goods", component: Goods },
  { path: "/Classify", component: Classify },
  { path: "/AddGoods", component: AddGoods },
  { path: "/ShopOrder", component: ShopOrder },
  // { path: "/VendingMachine", component: VendingMachine },
  { path: "/OrderPayment", component: OrderPayment },
  { path: "/Article", component: Article },
  { path: "/Banner", component: Banner },
  { path: "/Recharge", component: Recharge },
  { path: "/User", component: User },
  { path: "/Diliveryman", component: Diliveryman },
  { path: "/EditGoods", component: EditGoods },
  { path: "/ViewArticle", component: ViewArticle, name:"ViewArticle" },
  { path: "/EditArticle", component: EditArticle, name:"EditArticle" },
  { path: "/ColumnGoods", component: ColumnGoods },
  { path: "/Column", component: Column },
  { path: "/addBanner", component: addBanner },
  { path: "/EditBanner", component: EditBanner },
  { path: "/createArticle", component: createArticle },
  { path: "/Deal", component: Deal },
  { path: "/DataDaily", component: DataDaily }
];

const router = new VueRouter({
  routes
});

export default router;
</script>
