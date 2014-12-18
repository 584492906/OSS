package com.shinowit.services;

import com.shinowit.dao.BaseDao;
import com.shinowit.entity.TAuAuthorization;
import com.shinowit.entity.TAuRoleInfo;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;


@Service
public class RoleService {
    @Resource
    private BaseDao<TAuRoleInfo> roleDao;
    @Resource
    private BaseDao<TAuAuthorization> authorDao;

    @Transactional
    public boolean AddRoleAuthor(TAuRoleInfo role, List<TAuAuthorization> author) {

        boolean result = false;
        try {
            roleDao.insert(role);
            for (TAuAuthorization author1 : author) {

                author1.setAuRoleInfo(role);
                author1.setIsEnabled(true);
                authorDao.insert(author1);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        result = true;
        return result;
    }
}
