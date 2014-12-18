package com.shinowit.actions.merchandiseCInfo;

import com.opensymphony.xwork2.ActionSupport;
import org.springframework.jdbc.core.JdbcTemplate;

import javax.annotation.Resource;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2014/12/8.
 */
public class ChartAction extends ActionSupport {

    @Resource
    private JdbcTemplate jdtp;
    private List<Map<String, Object>> list;


    public String queryChart() {
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");

        //获取前月的第一天
        Calendar cal_1 = Calendar.getInstance();//获取当前日期
        cal_1.add(Calendar.MONTH, 0);
        cal_1.set(Calendar.DAY_OF_MONTH, 1);//设置为1号,当前日期既为本月第一天
        String Day = format.format(cal_1.getTime());

        String sql = " select b.MerchandiseName,SUM(a.Num*a.Price) as total from TMe_OutStockDetailsInfo a inner join TMe_MerchandiseInfo b on a.MerchandiseID=b.MerchandiseID inner join TMe_OutStockInfo c on a.OutBillCode=c.OutBillCode where c.OutTime between " + Day + " and GETDATE() group by b.MerchandiseName ";
        list = jdtp.queryForList(sql);
        return SUCCESS;
    }

    public List<Map<String, Object>> getList() {
        return list;
    }

    public void setList(List<Map<String, Object>> list) {
        this.list = list;
    }
}
