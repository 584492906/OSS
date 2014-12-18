package com.shinowit.actions.menu;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDao;
import com.shinowit.dao.MenuDao;
import com.shinowit.entity.TAuMenuInfo;
import com.shinowit.entity.TAuOperInfo;
import com.shinowit.entity.TAuRoleInfo;
import com.shinowit.entity.TreeNode;
import org.apache.struts2.ServletActionContext;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;


public class MenuInfoAction extends ActionSupport {
    private TreeNode menu;
    @Resource
    private MenuDao menuDao;
    private TAuRoleInfo role;

    public String menuTree() {

        menu = menuDao.queryModule(role.getRoleId());
        return SUCCESS;
    }

    public TreeNode getMenu() {
        return menu;
    }

    public void setMenu(TreeNode menu) {
        this.menu = menu;
    }

    public TAuRoleInfo getRole() {
        return role;
    }

    public void setRole(TAuRoleInfo role) {
        this.role = role;
    }

    public TreeNode queryModule() {
        String role = (String) ServletActionContext.getRequest().getSession().getAttribute("role");
        TreeNode result = new TreeNode();
        List<TAuMenuInfo> manlist = new ArrayList<TAuMenuInfo>();
        try {
            for (TAuMenuInfo module : manlist) {
                TreeNode node = new TreeNode();
                node.setMenu(module);
                result.addChild(node);
                menuDao.queryModule(role);

            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }
}
