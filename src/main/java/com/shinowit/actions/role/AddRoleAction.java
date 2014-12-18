package com.shinowit.actions.role;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDao;
import com.shinowit.entity.TAuAuthorization;
import com.shinowit.entity.TAuMenuInfo;
import com.shinowit.entity.TAuRoleInfo;
import com.shinowit.services.RoleService;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by Administrator on 2014/12/4.
 */
public class AddRoleAction extends ActionSupport {

    private TAuRoleInfo role;
    private boolean success;
    private boolean result;
    private String message;
    private String menus;
    @Resource
    private RoleService service;

    public String addRole() {


        boolean result=false;
        try {
            List<TAuAuthorization> author = new ArrayList<TAuAuthorization>();
            String a[] = menus.split(", ");
            for (String s : a) {
                TAuAuthorization au = new TAuAuthorization();
                TAuMenuInfo menuInfo = new TAuMenuInfo();
                menuInfo.setMenuId(s);
                au.setAuMenuInfo(menuInfo);
                author.add(au);
            }
           result=service.AddRoleAuthor(role,author);

        } catch (Exception e) {
            e.printStackTrace();
        }
        if (result==true) {
            setResult(true);
            setSuccess(true);
            message = "添加成功！";
            return SUCCESS;
        } else {
            setSuccess(true);
            setResult(false);
            message = "添加失败！";
            return SUCCESS;
        }

    }


    public TAuRoleInfo getRole() {
        return role;
    }

    public void setRole(TAuRoleInfo role) {
        this.role = role;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public boolean isResult() {
        return result;
    }

    public void setResult(boolean result) {
        this.result = result;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getMenus() {
        return menus;
    }

    public void setMenus(String menus) {
        this.menus = menus;
    }

    public RoleService getService() {
        return service;
    }

    public void setService(RoleService service) {
        this.service = service;
    }
}
