package com.shinowit.actions.role;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDao;
import com.shinowit.entity.TAuRoleInfo;

import javax.annotation.Resource;
import java.util.List;

public class RoleAction extends ActionSupport {
    @Resource
    private BaseDao<TAuRoleInfo> dao;
    private List<TAuRoleInfo> role;


    public String queryRole() {

        role = dao.listAll(TAuRoleInfo.class);

        return SUCCESS;
    }

    public List<TAuRoleInfo> getRole() {
        return role;
    }

    public void setRole(List<TAuRoleInfo> role) {
        this.role = role;
    }
}
