package com.shinowit.actions.menu;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDao;
import com.shinowit.entity.TAuMenuInfo;

import javax.annotation.Resource;

/**
 * Created by Administrator on 2014/12/9.
 */
public class UpdateMenuAction extends ActionSupport {
    @Resource
    private BaseDao<TAuMenuInfo> dao;
    private TAuMenuInfo menu;
    private boolean success;
    private boolean result;
    private String message;

    public String updateMenu() {
        Object o = false;

        try {
            o = dao.delBySql("update TAu_MenuInfo set state=? where menuId=?",menu.getState(),menu.getMenuId());

        } catch (Exception e) {
            e.printStackTrace();
        }

        if (o != null) {
            setSuccess(true);
            setResult(true);
            message = "修改成功,将在重启系统后生效";
            return SUCCESS;
        } else {
            setSuccess(true);
            setResult(false);
            message = "修改失败";
            return SUCCESS;
        }

    }


    public TAuMenuInfo getMenu() {
        return menu;
    }

    public void setMenu(TAuMenuInfo menu) {
        this.menu = menu;
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
}
