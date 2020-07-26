<template>
    <!-- begin sidebar nav -->
    <ul class="nav" v-if="menus">
        <li class="nav-search" v-if="pageOptions.pageSidebarSearch">
            <input class="form-control" placeholder="Sidebar menu filter..." type="text"
                   v-on:keyup="handleSidebarFilter"/>
        </li>
        <li class="nav-header">Navigation</li>
        <template v-for="menu in menus">
            <sidebar-nav-list
                ref="sidebarNavList"
                v-bind:key="menu.path"
                v-bind:menu="menu"
                v-bind:scrollTop="scrollTop"
                v-bind:status="menu.status"
                v-on:collapse-other="handleCollapseOther(menu)"
                v-on:hideFloatSubmenu="handleHideFloatSubmenu"
                v-on:showFloatSubmenu="handleShowFloatSubmenu"></sidebar-nav-list>
        </template>
        <!-- begin sidebar minify button -->
        <li><a class="sidebar-minify-btn" href="javascript:;" v-on:click="handleSidebarMinify()"><i
            class="fa fa-angle-double-left"></i></a></li>
        <!-- end sidebar minify button -->
    </ul>
    <!-- end sidebar nav -->
</template>

<script>
    import SidebarMenu from './SidebarMenu.vue';
    import SidebarNavList from './SidebarNavList.vue';
    import PageOptions from '../../config/PageOptions.vue';
    import {mapGetters} from 'vuex';

    export default {
        name: 'SidebarNav',
        props: ['scrollTop'],
        components: {
            SidebarNavList
        },
        data() {
            return {
                pageOptions: PageOptions
            };
        },
        computed:{
            ...mapGetters(['permissions']),
            menus(){
                if(this.permissions == '超级管理员'){
                    return SidebarMenu.sidebarMenu;
                }else{
                    return SidebarMenu.userMenu;
                }
            },
        },
        methods: {
            handleShowFloatSubmenu: function (menu, offset) {
                this.$emit('showFloatSubmenu', menu, offset);
            },
            handleHideFloatSubmenu: function () {
                this.$emit('hideFloatSubmenu');
            },
            handleCollapseOther: function (menu) {
                for (var i = 0; i < this.menus.length; i++) {
                    this.$refs.sidebarNavList[i].collapse(menu);
                }
            },
            handleSidebarMinify: function () {
                this.pageOptions.pageSidebarMinified = !this.pageOptions.pageSidebarMinified;
            },
            handleSidebarFilter: function (e) {
                var value = e.target.value;
                value = value.toLowerCase();

                if (value) {
                    for (var x = 0; x < this.menus.length; x++) {
                        var title = (this.menus[x].title).toLowerCase();
                        var children = this.menus[x].children;

                        if (title.search(value) > -1) {
                            this.$refs.sidebarNavList[x].show();

                            if (children) {
                                this.$refs.sidebarNavList[x].searchExpand();
                            }
                        } else {
                            if (children) {
                                var hasActive = false;
                                for (var y = 0; y < children.length; y++) {
                                    var title2 = (children[y].title).toLowerCase();

                                    if (title2.search(value) > -1) {
                                        hasActive = true;
                                        this.$refs.sidebarNavList[x].$refs.sidebarNavList[y].show();
                                        this.$refs.sidebarNavList[x].searchExpand();
                                    } else {
                                        if (hasActive) {
                                            this.$refs.sidebarNavList[x].searchExpand();
                                        } else {
                                            this.$refs.sidebarNavList[x].hide();
                                        }
                                        this.$refs.sidebarNavList[x].$refs.sidebarNavList[y].hide();
                                    }
                                }
                            } else {
                                this.$refs.sidebarNavList[x].hide();
                            }
                        }
                    }
                } else {
                    for (var a = 0; a < this.menus.length; a++) {
                        this.$refs.sidebarNavList[a].show();

                        var submenu = this.menus[a].children;
                        if (submenu) {
                            for (var b = 0; b < submenu.length; b++) {
                                this.$refs.sidebarNavList[a].$refs.sidebarNavList[b].show();
                            }
                        }
                    }
                }
                console.log('------');
            }
        }
    };
</script>
