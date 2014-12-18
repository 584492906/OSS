package com.shinowit.dao;

import com.shinowit.entity.TAuMenuInfo;
import com.shinowit.entity.TreeNode;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

@Repository
public class MenuDao {
    @Resource
    private SessionFactory sessionFactory;

    private void querySubModule(TreeNode parentNode,String roleId) {
        Session session = sessionFactory.openSession();
        String sql = "select distinct c.* from TAu_RoleInfo a inner join TAu_Authorization b on a.RoleID = b.RoleID  inner join TAu_MenuInfo c on b.MenuID = c.MenuID where a.RoleID = ? and c.parent_menu_id = ?";
        Query query = session.createSQLQuery(sql).addEntity(TAuMenuInfo.class);
        query.setParameter(0, roleId);
        query.setParameter(1,parentNode.getMenu().getMenuId());
        List<TAuMenuInfo> moduleList = query.list();
        session.close();
        for (TAuMenuInfo module : moduleList) {
            TreeNode node = new TreeNode();
            node.setMenu(module);
            parentNode.addChild(node);
            querySubModule(node,roleId);
        }
    }

    @Transactional
    public TreeNode queryModule(String roleId) {
        TreeNode result = new TreeNode();
        Session session = sessionFactory.openSession();
        String sql = "SELECT distinct c.* from TAu_RoleInfo a INNER JOIN TAu_Authorization b on a.RoleID = b.RoleID INNER JOIN TAu_MenuInfo c ON c.MenuID = b.MenuId where  a.RoleID = ? and c.parent_menu_id is NUll and c.state='true'";
        try {
            Query query = session.createSQLQuery(sql).addEntity(TAuMenuInfo.class);
            query.setParameter(0, roleId);
//            query.setParameter(1,parentNode.getMenu().getParentMenu());
            List<TAuMenuInfo> menuinfoEntities = query.list();
            session.close();
            for (TAuMenuInfo menuInfo : menuinfoEntities) {
                TreeNode node = new TreeNode();
                node.setMenu(menuInfo);
                result.addChild(node);
                querySubModule(node,roleId);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }



}
