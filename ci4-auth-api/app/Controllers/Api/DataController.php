<?php 

namespace App\Controllers\Api;

use CodeIgniter\RESTful\ResourceController;

class DataController extends ResourceController
{
    protected $format = 'json';

    public function getTeachers()
    {
        $db = \Config\Database::connect();
        $builder = $db->table('teachers');
        $builder->select('auth_user.id, auth_user.first_name, auth_user.last_name, auth_user.email, teachers.university_name, teachers.gender, teachers.year_joined');
        $builder->join('auth_user', 'auth_user.id = teachers.user_id');
        $query = $builder->get();
        
        return $this->respond($query->getResult());
    }

    public function getUsers()
    {
        $db = \Config\Database::connect();
        $builder = $db->table('auth_user');
        $builder->select('id, email, first_name, last_name, created_at');
        $query = $builder->get();
        return $this->respond($query->getResult());
    }
}