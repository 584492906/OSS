package com.shinowit.actions.supplier;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDao;
import com.shinowit.entity.TBaSupplierInfo;

import javax.annotation.Resource;
import java.io.UnsupportedEncodingException;
import java.util.List;

/**
 * Created by Administrator on 2014-11-10.
 */
public class SupplierAction extends ActionSupport {
    @Resource
    private BaseDao<TBaSupplierInfo> dao;
    private List<TBaSupplierInfo> supplier;
    private int page;
    private int limit;
    private int rowcount;
    private boolean success;
    private String qual;

    public static String charSet(String code) {
        try {
            byte[] bb = code.getBytes("ISO-8859-1");
            code = new String(bb, "UTF-8");
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        return code;
    }


    public String querySupplier() {
        if (qual == null) {
            setSuccess(true);
            supplier = dao.queryForPage("from TBaSupplierInfo", page, limit);
            rowcount = dao.queryRecordCount("select count(*) from TBaSupplierInfo");
        } else {
            setSuccess(true);
            qual = charSet(qual);
            supplier = dao.queryForPage("from TBaSupplierInfo where supplierName like \'%" + qual + "%\' or linkName like \'%" + qual + "%\' or address like \'%" + qual + "%\'", page, limit);
            rowcount = dao.queryRecordCount("select count(*) from TBaSupplierInfo where supplierName like \'%" + qual + "%\'");
        }
        return SUCCESS;
    }


    public int getRowcount() {
        return rowcount;
    }

    public void setRowcount(int rowcount) {
        this.rowcount = rowcount;
    }

    public int getPage() {
        return page;
    }

    public void setPage(int page) {
        this.page = page;
    }

    public int getLimit() {
        return limit;
    }

    public void setLimit(int limit) {
        this.limit = limit;
    }

    public List<TBaSupplierInfo> getSupplier() {
        return supplier;
    }

    public void setSupplier(List<TBaSupplierInfo> supplier) {
        this.supplier = supplier;
    }


    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getQual() {
        return qual;
    }

    public void setQual(String qual) {
        this.qual = qual;
    }
}
