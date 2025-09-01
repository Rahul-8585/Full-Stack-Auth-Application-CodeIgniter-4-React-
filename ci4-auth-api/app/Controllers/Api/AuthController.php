<?php

namespace App\Controllers\Api;

use App\Controllers\BaseController;
use App\Models\AuthUserModel;
use App\Models\TeacherModel;
use CodeIgniter\API\ResponseTrait;
use \Firebase\JWT\JWT;

class AuthController extends BaseController
{
    use ResponseTrait;

    public function register()
    {
        $rules = [
            'email' => 'required|valid_email|is_unique[auth_user.email]',
            'password' => 'required|min_length[8]',
            'first_name' => 'required',
            'last_name' => 'required',
            'university_name' => 'required',
            'gender' => 'required',
            'year_joined' => 'required|exact_length[4]|numeric'
        ];

        if (!$this->validate($rules)) {
            return $this->fail($this->validator->getErrors());
        }
        
        $db = \Config\Database::connect();
        $db->transStart();

        try {
            // Insert into auth_user table
            $userModel = new AuthUserModel();
            $userData = [
                'email' => $this->request->getVar('email'),
                'password' => $this->request->getVar('password'),
                'first_name' => $this->request->getVar('first_name'),
                'last_name' => $this->request->getVar('last_name'),
            ];
            $userModel->save($userData);
            $userId = $userModel->getInsertID();

            // Insert into teachers table
            $teacherModel = new TeacherModel();
            $teacherData = [
                'user_id' => $userId,
                'university_name' => $this->request->getVar('university_name'),
                'gender' => $this->request->getVar('gender'),
                'year_joined' => $this->request->getVar('year_joined'),
            ];
            $teacherModel->save($teacherData);
            
            $db->transComplete();

            return $this->respondCreated(['message' => 'User registered successfully']);

        } catch (\Exception $e) {
            $db->transRollback();
            return $this->failServerError('An error occurred during registration.');
        }
    }

    public function login()
    {
        $rules = [
            'email' => 'required|valid_email',
            'password' => 'required',
        ];

        if (!$this->validate($rules)) {
            return $this->fail($this->validator->getErrors());
        }

        $model = new AuthUserModel();
        $user = $model->where('email', $this->request->getVar('email'))->first();

        if (!$user) {
            return $this->failNotFound('Email not found');
        }

        $verify = password_verify($this->request->getVar('password'), $user['password']);

        if (!$verify) {
            return $this->fail('Incorrect password');
        }

        $key = getenv('jwt.secret');
        $payload = [
            'iat' => time(),
            'exp' => time() + 3600, // Expires in 1 hour
            'uid' => $user['id'],
            'email' => $user['email']
        ];

        $token = JWT::encode($payload, $key, 'HS265');

        return $this->respond(['token' => $token]);
    }
}